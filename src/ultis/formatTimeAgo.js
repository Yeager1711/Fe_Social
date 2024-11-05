export const formatTimeAgo = (createAt) => {
    const createTime = new Date(createAt);
    const now = new Date();
    const diffInSeconds = Math.floor((now - createTime) / 1000);

    if (diffInSeconds < 60) {
        return `${diffInSeconds}s`;
    } else if (diffInSeconds < 3600) {
        return `${Math.floor(diffInSeconds / 60)}m`;
    } else if (diffInSeconds < 86400) {
        return `${Math.floor(diffInSeconds / 3600)}h`;
    } else if (diffInSeconds < 2592000) {
        return `${Math.floor(diffInSeconds / 86400)}d`;
    } else if (diffInSeconds < 31536000) {
        return `${Math.floor(diffInSeconds / 2592000)}mo`;
    } else {
        return `${Math.floor(diffInSeconds / 31536000)}y`;
    }
};