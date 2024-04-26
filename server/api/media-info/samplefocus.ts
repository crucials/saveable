import { HTMLElement, parse } from 'node-html-parser'
import type { MediaInfo } from '~/types/media-info'

interface Sample {
    slug : string,
    sample_mp3_url : string
}

const downloadMethodErrorMessage = 'Failed to grab sample info. ' + 
    'Make sure your URL starts with \'https://samplefocus.com/samples/...\'. ' +
    'If URL is valid, apparently, SampleFocus updated their website. '

export default defineEventHandler<Promise<MediaInfo>>(async event => {
    let sampleUrl = getQuery(event)['sample_url']?.toString()

    if(!sampleUrl) {
        throw createError({
            statusCode: 400,
            message: `Query parameter 'sample_url' not provided`
        })
    }

    if(sampleUrl.endsWith('/download')) {
        sampleUrl = sampleUrl.substring(0, sampleUrl.lastIndexOf('/download'))
    }

    let root : HTMLElement

    const samplePageResponse = await fetch(sampleUrl)
    if(!samplePageResponse.ok) {
        throw createError({
            statusCode: 400,
            message: 'Failed to parse sample page. Make sure URL is valid and '
                + 'requested sample exists. status code: ' + samplePageResponse.status,
        })
    }
    root = parse(await samplePageResponse.text())

    const sampleWaveForm = root.querySelectorAll('div[data-react-class="SampleWaveformContainer"]')[0]
    const rawSamplesJson = sampleWaveForm?.getAttribute('data-react-props')

    if (!sampleWaveForm || !rawSamplesJson) {
        throw createError({
            statusCode: 500,
            message: downloadMethodErrorMessage,
        })
    }

    const sample: Sample = JSON.parse(rawSamplesJson)?.sample

    if (!sample) {
        throw createError({
            statusCode: 500,
            message: downloadMethodErrorMessage,
        })
    }

    return {
        downloadUrl: sample.sample_mp3_url,
        name: sample.slug,
    }
})