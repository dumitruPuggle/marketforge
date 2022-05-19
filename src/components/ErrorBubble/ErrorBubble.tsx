function ErrorBubble({errorList}: {errorList: string[]}) {
    return (
        <>
            {
                errorList.map((error, index) => {
                    return (
                        <p key={index} className="error-message mb-2">
                            {error}
                        </p>
                    );
                })
            }
        </>
    )
}

export default ErrorBubble;
