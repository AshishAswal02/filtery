import { Card, CardMedia } from '@material-ui/core'
import './styles.css'

const EmptyView = () => {
  return (
    <div className='emptyView-wrap'>
        <img className='emptyView_img' src="/images/gif/noresult.gif" alt="emptyView" />
    </div>

  )
}

export default EmptyView