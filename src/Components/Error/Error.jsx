import styles from './Style.module.css';

function Error({ appStatus, updateAppStatus }) {
    if (appStatus === 200) {
        return null;
    }

    let message = "";
    let isProcessing = false;

    if (appStatus === "Failed to fetch weather data") {
        message = "Không tìm thấy thành phố. Vui lòng kiểm tra lại!";
    } else if (appStatus === "processing") {
        isProcessing = true;
    } else {
        message = "Đã xảy ra lỗi. Vui lòng kiểm tra lại Internet!";
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                {isProcessing ? (
                    <div className={styles.processingContainer}>
                        <p className={styles.processingMessage}>Đang tải dữ liệu...</p>
                        <div className={styles.spinner}></div>
                    </div>
                ) : (
                    <>
                        <p>{message}</p>
                        <button
                            className={styles.closeButton}
                            onClick={() => updateAppStatus(200)}
                        >
                            Đóng
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Error;
