import { useHistory } from 'react-router-dom';
import './Back.css'
import back from './back.svg'
import { useTranslation } from 'react-i18next'
function Back(){
    const history = useHistory()
    const { t } = useTranslation();
    return(
        <div className="back-button">
            <div onClick={() => history.goBack()} className='back-inner'>
                <img className="mr-2 mb-0" alt="" src={back} />
                <small className='back-text'>{t('back')}</small>
            </div>
        </div>
    )
}
export default Back;