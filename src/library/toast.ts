import {message} from "antd";

message.config({
    top: 80,
    duration: 3,
    maxCount: 3,
    rtl: false,
});

/**
 * Custom toast utility using Ant Design's message component
 * Can be used anywhere in your app without hooks
 */

const toast = {
    /**
     * Show success message
     * @param content - Message content
     * @param duration - Duration in seconds (default: 3)
     */
    success: (content: string, duration?: number) => {
        message.success({
            content,
            duration: duration ?? 3,
            className: "custom-toast-success",
        });
    },

    /**
     * Show error message
     * @param content - Message content
     * @param duration - Duration in seconds (default: 3)
     */
    error: (content: string, duration?: number) => {
        message.error({
            content,
            duration: duration ?? 3,
            className: "custom-toast-error",
        });
    },

    /**
     * Show info message
     * @param content - Message content
     * @param duration - Duration in seconds (default: 3)
     */
    info: (content: string, duration?: number) => {
        message.info({
            content,
            duration: duration ?? 3,
            className: "custom-toast-info",
        });
    },

    /**
     * Show warning message
     * @param content - Message content
     * @param duration - Duration in seconds (default: 3)
     */
    warning: (content: string, duration?: number) => {
        message.warning({
            content,
            duration: duration ?? 3,
            className: "custom-toast-warning",
        });
    },

    /**
     * Show loading message
     * @param content - Message content
     * @param duration - Duration in seconds (default: 0 = until manually closed)
     * @returns Function to close the loading message
     */
    loading: (content: string, duration?: number) => {
        const hide = message.loading({
            content,
            duration: duration ?? 0, // 0 means it won't auto-close
            className: "custom-toast-loading",
        });
        return hide; // Return the hide function so you can dismiss it manually
    },

    /**
     * Dismiss all messages
     */
    dismiss: () => {
        message.destroy();
    },

    /**
     * Promise-based loading with auto success/error
     * Useful for async operations
     * @param promise - Promise to track
     * @param messages - Custom messages for each state
     */
    promise: async <T>(
        promise: Promise<T>,
        messages: {
            loading: string;
            success: string;
            error: string;
        },
    ): Promise<T> => {
        const hide = message.loading(messages.loading, 0);

        try {
            const result = await promise;
            hide();
            message.success(messages.success);
            return result;
        } catch (error) {
            hide();
            message.error(messages.error);
            throw error;
        }
    },
};

export default toast;
