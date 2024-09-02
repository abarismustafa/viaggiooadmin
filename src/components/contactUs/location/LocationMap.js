
function LocationMap() {
    return (
        <>
            <section className="LocationMap">
                <div className="Wrapper">
                    <div className="TopContent" uk-scrollspy="cls: uk-animation-slide-bottom; target: > div; delay: 300; repeat: false">
                        <div className="ourservie uk-scrollspy-inview uk-animation-slide-bottom" style={{}}>
                            <span className="leftLine">
                                <i />
                                <i />
                            </span>
                            <p>Our Branches</p>
                            <span className="rightLine">
                                <i />
                                <i />
                            </span>
                        </div>
                        <div className="Title uk-scrollspy-inview uk-animation-slide-bottom" style={{}}>
                            <h3>We are Located here</h3>
                        </div>
                        <div className="content uk-scrollspy-inview uk-animation-slide-bottom" style={{}}>
                            <p>MasterPay is a growth oriented, forward looking and fast paced technology and marketing<br /> solution provider.</p>
                        </div>
                    </div>
                    <div className="BranchMapList">
                        <div className="row" uk-scrollspy="cls: uk-animation-slide-bottom;target: > div; delay: 300; repeat: false">
                            <div className="col-md-12 col-lg-12 uk-scrollspy-inview uk-animation-slide-bottom" style={{}}>
                                <div className="item">
                                    <div className="MapBox">
                                        <div className="GoogleMapFrame">
                                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14767.791148790535!2d70.7753378!3d22.2799676!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x693a4224b5f804fa!2sChampion+Software+Technologies+Ltd.!5e0!3m2!1sen!2sin!4v1562667600114!5m2!1sen!2sin" frameBorder={0} style={{ border: 0 }} allowFullScreen />
                                        </div>
                                    </div>
                                    <div className="Text">
                                        <h3><a href="https://maps.google.com/maps?ll=22.279968,70.775338&z=14&t=m&hl=en&gl=IN&mapclient=embed&cid=7582445648070837498" target="_blank">Head Office - Rajkot</a></h3>
                                        <p>Champion Software Technologies Ltd.,<br /> 351-52-36-37-22, Iskon Mall, Near Big Bazar,<br /> 150 Feet Ring Road, Rajkot, Gujarat - 360005</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-4 uk-scrollspy-inview uk-animation-slide-bottom" style={{}}>
                                <div className="item">
                                    <div className="MapBox">
                                        <div className="GoogleMapFrame">
                                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.2440620218645!2d77.38486561508243!3d28.622446482421786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM3JzIwLjgiTiA3N8KwMjMnMTMuNCJF!5e0!3m2!1sen!2sin!4v1628931137051!5m2!1sen!2sin" width={600} height={400} style={{ border: 0 }} allowFullScreen loading="lazy" />
                                            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1237.8900542604454!2d77.30497516123374!3d28.65127959991988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb410deae18b%3A0x311e1d81cd311e70!2sNeelkantha+Chamber%2C+Bhartendu+Harish+Chandra+Marg%2C+Kanishka+Complex%2C+Karkardooma%2C+Anand+Vihar%2C+Delhi%2C+110092!5e0!3m2!1sen!2sin!4v1562738589042!5m2!1sen!2sin" frameborder="0" style="border:0" allowfullscreen></iframe> */}
                                        </div>
                                    </div>
                                    <div className="Text">
                                        <h3><a href="https://goo.gl/maps/SWHGiMs3vVpvwgVD8" target="_blank">Noida Branch</a></h3>
                                        <p>E-178, Sector-63,<br />Noida, Uttar Pradesh-201301.</p>
                                        {/* <h3><a href="https://maps.google.com/maps?ll=28.651162,77.305451&z=16&t=m&hl=en&gl=IN&mapclient=embed&q=Neelkantha%20Chamber%20Bhartendu%20Harish%20Chandra%20Marg%20Kanishka%20Complex%2C%20Karkardooma%2C%20Anand%20Vihar%20Delhi%2C%20110092" target="_blank">Delhi Branch</a></h3>
                                      <p>205-206, Neelkanth Chambers-2,<br> Plot No. 14 | Saini Enclave LSC<br> Near Karkardooma Metro Station, Delhi - 110 092</p> */}
                                    </div>
                                </div>
                            </div>
                            {/*   <div class="col-md-12 col-lg-6">
                                  <div class="item">
                                      <div class="MapBox">
                                          <div class="GoogleMapFrame">
                                              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.4069409618446!2d75.77037901504445!3d26.890577283137066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDUzJzI2LjEiTiA3NcKwNDYnMjEuMiJF!5e0!3m2!1sen!2sin!4v1563171475417!5m2!1sen!2sin" frameborder="0" style="border:0" allowfullscreen></iframe>
                                          </div>
                                      </div>
                                      <div class="Text">
                                          <h3><a href="https://maps.google.com/maps?ll=26.890583,75.772556&z=15&t=m&hl=en&gl=IN&mapclient=embed" target="_blank">Rajasthan Branch</a></h3>
                                          <p>Plot No-5, Swej Farm, Mahima's Triniti Mall,<br> New Sanganer Road, Sodala,<br> Jaipur - 302019</p>
                                          </div>
                                      </div>
                                  </div> */}
                            <div className="col-md-12 col-lg-4 uk-scrollspy-inview uk-animation-slide-bottom" style={{}}>
                                <div className="item">
                                    <div className="MapBox">
                                        <div className="GoogleMapFrame">
                                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.0501000544746!2d72.95046651437849!3d19.19301400327265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b96f0b099f21%3A0xc978277a19452515!2sSunrise%20Business%20Park!5e0!3m2!1sen!2sin!4v1613037355719!5m2!1sen!2sin" width={600} height={400} frameBorder={0} style={{ border: 0 }} allowFullScreen aria-hidden="false" tabIndex={0} />
                                        </div>
                                    </div>
                                    <div className="Text">
                                        <h3><a href="https://goo.gl/maps/dJhtwNRvvgrcBcBZ9" target="_blank">Mumbai Branch</a></h3>
                                        <p>605 - Sunrise Business Park,<br /> S. G. Barve Rd Road No. 16, Nehru Nagar,<br /> Wagle Industrial Estate, Thane, Maharashtra 400604
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-4 uk-scrollspy-inview uk-animation-slide-bottom" style={{}}>
                                <div className="item">
                                    <div className="MapBox">
                                        <div className="GoogleMapFrame">
                                            <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3885.888127966235!2d77.572743!3d13.106273000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTPCsDA2JzIyLjYiTiA3N8KwMzQnMjEuOSJF!5e0!3m2!1sen!2sin!4v1689242645195!5m2!1sen!2sin" width={600} height={400} frameBorder={0} style={{ border: 0 }} allowFullScreen aria-hidden="false" tabIndex={0} />
                                        </div>
                                    </div>
                                    <div className="Text">
                                        <h3><a href="https://goo.gl/maps/kE6xefAC2EB6ycfF8" target="_blank">Bangalore Branch</a></h3>
                                        <p>Near Yelhanka 5th Phase Bus Stand,<br />Landmark - Miranda College, Yelhanka,<br />Bangalore - 560 064</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
export default LocationMap