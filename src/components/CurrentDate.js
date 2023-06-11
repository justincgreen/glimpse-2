import{ currentDate } from '@/helpers/currentDate';

const CurrentDate = () => {
  return (
    <h4 className="c-current-date">
      { `Today's Date: ${currentDate()}` }    
    </h4>
  )
}

export default CurrentDate
