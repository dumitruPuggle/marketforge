function EmailBox({email}: {email: string}) {
  return (
    <div style={{ position: "relative" }}>
      <div></div>
      <input
        className="p-5 transparent-input"
        style={{
          fontSize: 19,
          textAlign: 'center',
          width: '100%',
          fontWeight: 500,
          backgroundColor: "#f7f7f7",
          fontFamily: "IBM Plex Mono, monospace",
        }}
        defaultValue={email}
      />
      <small
        className="outline-button"
        style={{
          bottom: "15px",
          right: "10px",
          position: "absolute",
          color: "#BDBDBD",
          fontWeight: 400,
        }}
      >
        (Valid) Certifier: Apple Public EV Server RSA CA 2 - G1
      </small>
    </div>
  );
}

export default EmailBox;
