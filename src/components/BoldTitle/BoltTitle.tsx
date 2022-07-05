function BoldTitle({title, style}: {title: string, style?: object}){
    return(
        <div style={{width: "100%", textAlign: 'left', padding: '10px', ...style}}>
            <h2 style={{fontSize: '24px', fontWeight: '800'}}>{title}</h2>
        </div>
    )
}

export default BoldTitle;