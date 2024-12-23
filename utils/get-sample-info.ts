import { EXTERNAL_PROXY_URL } from '~/constants/api-urls'
import type { Sample } from '~/types/sample'

export async function getSampleMediaInfo(url: string) {
    const downloadMethodErrorMessage =
        'Failed to grab sample info. If your URL is ' +
        'valid, then, apparently, SampleFocus updated their website'

    let fixedSampleUrl = url
    if (url.endsWith('/download')) {
        fixedSampleUrl = url.substring(0, url.lastIndexOf('/download'))
    }

    const samplePageResponse = await fetch(
        EXTERNAL_PROXY_URL + '/?url=' + encodeURIComponent(fixedSampleUrl),
    )
    
    if (!samplePageResponse.ok) {
        throw new Error(
            'Failed to parse sample page. Make sure URL is valid and ' +
                'requested sample exists. status code: ' +
                samplePageResponse.status,
        )
    }
    const samplePage = new DOMParser().parseFromString(
        await samplePageResponse.text(),
        'text/html',
    )

    const rawSampleJson = samplePage.querySelector(
        'script[data-component-name="SampleWaveformContainer"]',
    )?.textContent

    if (!rawSampleJson) {
        throw new Error(downloadMethodErrorMessage)
    }

    const sample: Sample = JSON.parse(rawSampleJson)?.sample

    if (!sample) {
        throw new Error(downloadMethodErrorMessage)
    }

    return {
        downloadUrl: sample.sample_mp3_url,
        name: sample.slug,
    }
}
