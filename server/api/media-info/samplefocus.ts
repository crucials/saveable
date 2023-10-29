import { HTMLElement, parse } from 'node-html-parser'
import type { MediaInfo } from '~/types/media-info'

interface Sample {
    slug : string,
    sample_mp3_url : string
}

const downloadMethodErrorMessage = 'Failed to grab sample info. ' + 
    'Make sure your URL starts with \'https://samplefocus.com/samples/...\'. ' +
    'If URL is valid, apparently, SampleFocus updated their website. ' + 
    'Hit me up on Discord - @amputating or open an issue on Github - ' + 
    'https://github.com/crucials/saveable'

export default defineEventHandler<Promise<MediaInfo>>(async event => {
    const sampleUrl = getQuery(event)['sample_url']?.toString()

    if(!sampleUrl) {
        throw createError({
            statusCode: 400,
            message: `Query parameter 'sample_url' not provided`
        })
    }

    let root : HTMLElement
    try {
        const samplePageResponse = await fetch(sampleUrl)

        if(!samplePageResponse.ok) {
            throw new Error()
        }

        root = parse(await samplePageResponse.text())
    }
    catch(error) {
        throw createError({
            statusCode: 400,
            message: 'Failed to parse sample page. Make sure URL is valid and requested sample exists',
        })
    }

    const sampleWaveForm = root.querySelectorAll('div[data-react-class="SampleWaveform"]')[0]
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