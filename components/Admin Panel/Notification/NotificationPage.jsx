import React from 'react'
import "./notificationPage.css"
import NotificationDetail from './NotificationDetail'

const NotificationPage = () => {

    const notif = ["sdfsdgsggsgdsgg", "l;fjlafsadjfaljsf l;a;ljgl alkglkahglk aljgalj glkaj dgl jlaks gladlgjljljlkgjlkjl;dfj lgalkdjlg;j ;lkljg;ljlsdfjg;lalkg;lkadj lglklalk flkas flkas fklas fklashfklahfkl hakljg klahgkula fkldaklafklkl laiflailfklaf klfkl", "l;fjlaflalk flkas flkas fklas fklashfklahfkl hakljg klahgkula fkldaklafklkl laiflailfklaf klfkl", "l;fjlaflalk flkas flkas fklas fklashfklahfkl hakljg klahgkula fkldaklafklkl laiflailfklaf klfkl", "l;fjlaflalk flkas flkas fklas fklashfklahfkl hakljg klahgkula fkldaklafklkl laiflailfklaf klfkl", "l;fjlaflalk flkas flkas fklas fklashfklahfkl hakljg klahgkula fkldaklafklkl laiflailfklaf klfkl", "l;fjlaflalk flkas flkas fklas fklashfklahfkl hakljg klahgkula fkldaklafklkl laiflailfklaf klfkl", "l;fjlaflalk flkas flkas fklas fklashfklahfkl hakljg klahgkula fkldaklafklkl laiflailfklaf klfkl", "l;fjlaflalk flkas flkas fklas fklashfklahfkl hakljg klahgkula fkldaklafklkl laiflailfklaf klfkl", "l;fjlaflalk flkas flkas fklas fklashfklahfkl hakljg klahgkula fkldaklafklkl laiflailfklaf klfkl", "l;fjlaflalk flkas flkas fklas fklashfklahfkl hakljg klahgkula fkldaklafklkl laiflailfklaf klfkl", "l;fjlaflalk flkas flkas fklas fklashfklahfkl hakljg klahgkula fkldaklafklkl laiflailfklaf klfkl", "l;fjlaflalk flkas flkas fklas fklashfklahfkl hakljg klahgkula fkldaklafklkl laiflailfklaf klfkl"]
    const dates = ["1/10/24","4/3/24","4/3/24","4/3/24","4/3/24","4/3/24","4/3/24","4/3/24","4/3/24","4/3/24","4/3/24","4/3/24","4/3/24"]
    
    console.log(notif.length)
    console.log(dates.length)

    return (
    <div className='notificationPageBody'>
        <div className='notificationPageChild'>
            {
                notif.map((item, key)=>{
                    return (
                        <NotificationDetail notif={item} date={dates[key]}/>
                    )
                })
            }
        </div>
    </div>
  )
}

export default NotificationPage