export function changeShouldShowNPS(shouldShowNPS) {
    return {
        type: '@user/CHANGE_SHOULD_SHOW_NPS',
        payload: {
            shouldShowNPS,
        },
    };
}
