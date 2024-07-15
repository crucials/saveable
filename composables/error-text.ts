export function useErrorText() {
    const errorTextVisible = ref(false)
    const errorText = ref('')

    let hideTimeoutId = 0
    function showErrorText(text?: string, hideTimeout: number = 2750) {
        window.clearTimeout(hideTimeoutId)

        if (text) {
            errorText.value = text
        }

        errorTextVisible.value = true
        hideTimeoutId = window.setTimeout(() => {
            errorTextVisible.value = false
        }, hideTimeout)
    }

    return { errorTextVisible, errorText, showErrorText }
}
