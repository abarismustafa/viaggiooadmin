
import img1 from '../../asesets/banner/privacy-banner.png'
import img2 from '../../asesets/banner/terms-conditions-banner.png'
import img3 from '../../asesets/banner/grievance-redressal-banner.png'
import img4 from '../../asesets/banner/refund_and_cancellation_policy.png'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const mockData = [
    { id: '1', heading: 'Privacy Policy', para: 'We respect your Privacy', img: `${img1}` },
    { id: '2', heading: 'Terms & Conditions', para: 'We respect your Terms', img: `${img2}` },
    { id: '3', heading: 'Grievance Redressal Policy', para: 'We respect your Grievance Redressal', img: `${img3}` },
    { id: '4', heading: 'REFUND & CANCELLATION POLICY', para: 'We respect your REFUND', img: `${img4}` },
]
function BannerFoot() {
    const param = useParams()
    const [data, setData] = useState()
    useEffect(() => {
        const maped = mockData.filter((item) => {
            return item.id == param.id
        })
        setData(maped)
    }, [param])
    return (
        <>
            <section class="BannerMain">
                {data?.map((item) => {
                    return <>
                        <div class="BannerInner" style={{ background: `url(${item.img})` }} key={item.id}>
                            <div class="Title" uk-scrollspy="cls: uk-animation-slide-bottom; target: h2; repeat: false">
                                <h2 class="uk-scrollspy-inview uk-animation-slide-bottom">{item.heading}</h2>
                                <p uk-scrollspy="cls: uk-animation-slide-bottom; repeat: false" class="uk-scrollspy-inview uk-animation-slide-bottom">{item.para}</p>
                            </div>
                        </div>
                    </>
                })}
            </section>
        </>
    )
}
export default BannerFoot