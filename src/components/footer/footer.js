import React, { useState,useEffect } from 'react';
import { Container, Row, Col, Nav, Modal, Button } from 'react-bootstrap';
import './footer.css';

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 767 || window.innerWidth > 991);

  const handleModalShow = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 767 || window.innerWidth > 991 );
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const termsAndConditions = `Your User Account and Content
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.
Your Use of Our Service:
1. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

2. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

3. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur Lorem Ipsum is simply dummy text of the printing and typesetting industry.
Reporting Copyright and Other IP Violations
a. Ownership: Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

b. Content Ownership: Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

c. Rights in User Content Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur Lorem Ipsum is simply dummy text of the printing and typesetting industry.`

  const privacyPolicy = `
  Privacy & Policy
We, Pay Panda Payment Solution Private Limited., having registered office at C-23,First Floor,Sector 02,Noida,Uttar pradesh-201301, hereinafter referred to as Pay Panda. At Pay Panda, we value your trust & respect your privacy. This Privacy Policy provides you with details about the manner in which your data is collected, stored & used by us. You are advised to read this Privacy Policy carefully. By downloading and using the Pay Panda application/ website/WAP site you voluntarily give us consent to use & disclose your personal information in accordance with this Privacy Policy. If you do not agree to the terms of the policy, please do not use or access Pay Panda.
Note: Our privacy policy may change at any time without prior notification. To make sure that you are aware of any changes, kindly review the policy periodically. This Privacy Policy shall apply uniformly to Pay Panda applications, desktop website & mobile WAP site.

General
We will not sell, share or rent your personal information to any 3rd party or use your email address/mobile number for unsolicited emails and/or SMS. Any emails and/or SMS sent by Pay Panda will only be in connection with the provision of agreed services & products and this Privacy Policy. Periodically, we may reveal general statistical information about Pay Panda & its users, such as number of visitors, number and type of goods and services purchased, etc. We reserve the right to communicate your personal information to any third party that makes a legally-compliant request for its disclosure.

Personal Information
Personal Information means and includes all information that can be linked to a specific individual or to identify any individual, such as name, address, mailing address, telephone number, email ID, credit card number, cardholder name, card expiration date, information about your mobile phone, DTH service, data card, electricity connection, Smart Tags and any details that may have been voluntarily provided by the user in connection with availing any of the services on Pay Panda.When you browse through Pay Panda, we may collect information regarding the mobile/ tab device details, domain and host from which you access the internet, the Internet Protocol [IP] address of the computer or Internet service provider [ISP] you are using, and anonymous site statistical data.

Use of Personal Information
We use personal information to provide you with services & products you explicitly requested for, to resolve disputes, troubleshoot concerns, help promote safe services, collect money, measure consumer interest in our services, inform you about offers, products, services, updates, customize your experience, detect & protect us against error, fraud and other criminal activity, enforce our terms and conditions, etc.
We also use your contact information to send you offers based on your previous orders and interests. We may occasionally ask you to complete optional online surveys. These surveys may ask you for contact information and demographic information (like zip code, age, gender, etc.). We use this data to customize your experience at Pay Panda, providing you with content that we think you might be interested in and to display content according to your preferences.
We may share Personal Information as well as non-personal information of the User with the courts, police authorities, or any other government/regulatory/statutory authority, in case these are required by them in relation to any proceedings pending before them.

Cookies
A "cookie" is a small piece of information stored by a web server on a web browser so it can be later read back from that browser. Pay Panda uses cookie and tracking technology depending on the features offered. No personal information will be collected via cookies and other tracking technology; however, if you previously provided personally identifiable information, cookies may be tied to such information. Aggregate cookie and tracking information may be shared with third parties.
A cookie is a small file that asks permission to be placed on the User’s desktop/laptop/mobile device's memory drive. Once the User agrees, the file is added and the cookie helps analyze web traffic. Cookies allow Services to respond to the User as an individual. The Services can tailor its operations to the User’s needs, likes, and dislikes by gathering and remembering information about the User’s preferences.
Cookies help us better understand User’s behavior, and tell us which parts of the Services Users have visited, and facilitates and measure the effectiveness of products and services offered by us. We treat information collected by cookies and other technologies as non-personal information. However, to the extent that internet protocol (IP) addresses or similar identifiers are considered Personal Information by local law, we also treat these identifiers as Personal Information.
We use traffic log cookies to identify which pages are being used. This helps us analyze data about web page traffic and improve our Services in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.
Overall, cookies help us provide Users with a better experience of the Services, by enabling us to monitor which pages Users find useful and which the Users do not. A cookie in no way gives us access to the User’s desktop/laptop/mobile device or any information about the User, other than the data a User chooses to share with us.
A User can choose to accept or decline cookies. Most web browsers automatically accept cookies, but a User can usually modify its browser setting to decline cookies if the user prefers. This may prevent the User from taking full advantage of the Services.

Links to Other Sites
Our site links to other websites that may collect personally identifiable information about you. Pay Panda is not responsible for the privacy practices or the content of those linked websites.

Security
Pay Panda has stringent security measures in place to protect the loss, misuse, and alteration of the information under our control. Whenever you change or access your account information, we offer the use of a secure server. Once your information is in our possession we adhere to strict security guidelines, protecting it against unauthorized access.
We are committed to ensuring that the User’s Personal Information is secure. We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of the User's Personal Information, username, password, transaction information, and data stored in our Services.
When a User uses services and products offered by us through the Services, the Personal Information shared by the User is visible to the other users and can be read, collected, or used by them. The User is responsible for the Personal Information User chooses to submit in these instances. For example, if the User lists his/her name and email address in a blog/forum posting, that information is public. Users are requested to take care when using these features.

Consent
By using Pay Panda and/or by providing your information, you consent to the collection and use of the information you disclose on Pay Panda in accordance with this Privacy Policy, including but not limited to your consent for sharing your information as per this privacy policy.

What we collect?
We may collect and/or gain access to and/or record certain information including personal information from or of User in a variety of ways, including, but not limited to, when User access and uses the Services and in connection with other activities, services, features or resources we make available on the Services. These information may relate to and include but not limited to your name, email address, address, phone number, your unique device ID (persistent / non-persistent), hardware type, international mobile equipment identity (“IMEI”), the version of your operating system (“OS”), your device name, your email address (if you have connected to Facebook or Google+), and your location (based on your Internet Protocol (“IP”) address), contact list (on your mobile phone), applications installed by User through our mobile application, applications uninstalled by User, all other applications installed by User on his/her device, foreground running apps/process (RUN event; We update server about the app downloaded/installed by our mobile application), read SMS, network information, User behaviour analysis, demographic information (such as preferences and interests etc), Credit/Debit Card information of User for Internet banking (We do not store credit/debit card information on our servers) [hereinafter referred to as “Personal Information”]. Users can always refuse to supply Personal Information, however, it may prevent them from engaging in certain Services related activities.

What we do with the Personal Information we gather?
a. Administer the Services.:

b. Personalize the Services for User.

c. End to User direct links to the Services.

d. Process transactions.

e. Process installation.

f. Send User our newsletter.

g. Develop, deliver, and improve our products, services, content, and advertising.

h. Develop, deliver, and improve our products, services, content, and advertising.

i. Auditing, data analysis, and research to improve the Services.

j. Troubleshooting and helping us to understand usage trends.

k. Send alerts to User.

Marketing and promotion of the Services

Collection and use of non-personal information
We may collect non-personal information about Users whenever they use and interact with the Services. Non-personal information may include the browser name, the type of computer, and technical information about means used by the User to connect to our Services, such as the information about the operating system and the internet service providers utilized and other similar information.
This information is aggregated and used to help us provide more useful information to the User and to understand which part of the Services, its products, and services are of most interest.
If we do combine non-personal information with Personal Information, the combined information will be treated as Personal Information for as long as it remains combined.

Third party websites
Users may find advertising or other content on the Services that link to the sites and services of our partners, suppliers, advertisers, sponsors, licensors, and other third parties. We do not control the content or links that appear on these sites and services and are not responsible for the practices employed by those websites and services linked to or from our Services. In addition, these sites and services, including their content and links, may be constantly changing. These sites and services may have their own privacy policies and customer service policies. Browsing and interaction on any other website, including websites and services which have a link to the Services, is subject to that website and services’ terms and policies.

User acceptance of these terms
By using the Services, User signifies his/her acceptance of this Policy. If the User does not agree to this Policy, please do not use the Services. User continued use of the Services following the posting of changes to this Policy will be deemed User acceptance of those changes.
We respect and are committed towards protecting your privacy. Publishing, selling or renting any personal data or information to any third party, without your consent, is against our ethics.
The privacy practices of this statement apply to our services available under the domain and subdomains of the Site. By visiting this Site you agree to be bound by the terms and conditions of this privacy policy. If you do not agree, please do not use or access our site.
This privacy policy does not apply to sites maintained by other companies or organizations to which we link and we are not responsible for any personal information you submit to third parties via our website. Please ensure that you read the privacy policy of such other companies or organizations before submitting your details.
This privacy policy describes the information, as part of the normal operation of our services, we collect from you and what may happen to that information. This policy is inter alia formulated and displayed, to inform you about our information collection/retention policies and practices so that you can make an informed decision, in relation to the sharing of your personal information with us. By accepting the privacy policy and the user agreement or the use of the site in general, you give your consent to our use and disclosure of your personal information in accordance with this privacy policy. This Privacy Policy is incorporated into and subject to the terms of the User Agreement. This privacy policy is effective upon acceptance of access by you to the site.

Privacy Guarantee
We agree that we will not sell or rent your personal information to third parties for their marketing purposes without your explicit consent. From time to time, we may reveal general statistical information about our Site and visitors, such as number of visitors, number and type of goods and services purchased, etc. Only those of our employees who need access to your information in order to perform their duties, are allowed such access. Any employee who violates our privacy and/or security policies is subjected to disciplinary action, including possible termination and civil and/or criminal prosecution.

Information We Collect
The Personal Information is used for two general purposes: to process your order, and to provide you with the best possible services. Unless otherwise stated explicitly, this policy applies to personal information as disclosed on any of the media.
In furtherance of the confidentiality with which we treat Personal Information, we have put in place appropriate physical, electronic, and managerial procedures to safeguard and secure the information we collect online. We use data collection devices such as "cookies" on certain pages of the Site to help and analyze our web page flow, measure promotional effectiveness, and promote trust and safety. "Cookies" are small files placed on your hard drive that assist us in providing our services. We offer certain features that are only available through the use of a "cookie". Cookies can also help us provide information that is targeted to your interests. Most cookies are "session cookies," which means that they are automatically deleted from your hard drive at the end of a session. You are always free to decline our cookies if your browser permits. Additionally, you may encounter "cookies" or other similar devices on certain pages of the Site that are placed by third parties. For example, if you view a web page created by a user, there may be a "cookie" placed within that web page. We do not control the use of cookies by third parties.
You acknowledge that you are disclosing Personal Information voluntarily. We identify and use your IP address to help diagnose problems with our server, and to administer our Website. Your IP address is also used to help identify you and to gather broad demographic information.

COOKIE POLICY
www.paypanda.in operates a strict privacy policy and we are committed to being transparent about how we use cookies on our website.

Why are cookies important?
Cookies help you make your online experience more efficient and relevant to your interests. For instance, they are used to remember your preferences on sites you visit often, to remember your user ID and the contents of your shopping baskets, and to help you navigate between pages efficiently.

What is a Cookie?
A cookie is a small file, or files on your computer, phone, or other device with a browser to save snippets of text for reference by the website you are visiting. All cookies have expiration dates in them that determine how long they stay in your browser:
Session cookies - these are temporary cookies that expire (and are automatically erased) whenever you close your browser.
Persistent cookies - these usually have an expiration date and so stay in your browser until they expire, or until you manually delete them. For example we use persistent cookies to better understand usage patterns so that we can improve the site for our customers.
Cookies are grouped into the following categories:
Essential - these are cookies that are required for the regular operation of our websites.
Functional - these remember your preferences, and are intended to make your experience on our websites better for you.
Analytics – these cookies are used for performance measurement to understand things including how many people visit our websites, how they navigate our sites, and what content is popular. This allows us to improve your experience with us. Additionally, you can see how Google Analytics (one of our analytics tools) uses cookie information when you use our partners' sites by visiting www.google.com/policies/privacy/partners, or any other URL Google may provide from time to time
Advertising - these cookies enable us and our advertising partners to serve you with relevant advertisements that we think will interest you. You might see these advertisements on our sites on other sites you visit. These cookies record your visit to our website and the content you interact with. They may be placed by us, or by advertising partners with our permission.
To ensure compliance with our policies, we restrict the use of third-party cookies to trusted partners.
We also use third party information from third party sources to enable us deliver advertising. These sources are validated by Third party, and not by us.
To delete cookies from your browser, please note the following simple steps. The following steps are indicative for Google chrome and might vary of the different browsers that you may use. Please refer Settings on your browser for further details.
To ensure compliance with our policies, we restrict the use of third-party cookies to trusted partners.
You may also change other setting related to Privacy and Security under the same section.
  `;

  const refundPolicy = `
  REFUND AND CANCELLATION POLICY
PAY PANDA PAYMENT SOLUTION PRIVATE LIMITED is engaged in the business of providing
payment solutions, financial solutions and other allied financial services on the basis of its
engagement.
Once a value is debited from your payment instrument/bank account and you have received the
same value in your id, there is no cancellation or refund permitted for such transaction.
However, if in a transaction performed by you on the PAY PANDA Platform, money has been
charged to your card or bank account and a value is not delivered within 24 - 96 hours of the
completion of the transaction, then you shall inform us by sending an e-mail to our customer
service e-mail address mentioned on the ‘Contact Us’ page on the PAY PANDA Platform. Please
include the following details – value, transaction date and order number.
PAY PANDA will investigate the incident and, if it is found that money was indeed charged to
Your card or bank account without delivery of the value, then you will be refunded the money
within 45 working days from the date of receipt of your e-mail.
All refunds will be credited to the instrument that was charged.
We thank you for transacting with us and look forward to a bright and successful future for our
partnership.

 support@paypanda.in`;

  return (
    <footer className={`bg-dark text-light py-4 footerlasssign ${isDesktop ? 'fixed-bottom' : ''}`}>
      <Container>
        <Row className="align-items-center footerrowsignclass">
          <Col xs={12} md={6} className="text-center text-md-start mb-3 mb-md-0">
            <small>&copy; 2022 Pay Panda Payment Solution Pvt Ltd - All Rights Reserved.</small>
          </Col>
          <Col xs={12} md={6} className="text-center text-md-end">
            <Nav className="justify-content-center justify-content-md-end">
              <Nav.Item>
                <Button variant="link" className="text-light p-0 border-0" onClick={() => handleModalShow('Terms & Conditions', termsAndConditions)}>
                  Terms & Conditions
                </Button>
              </Nav.Item>
              <Nav.Item className="mx-2">|</Nav.Item>
              <Nav.Item>
                <Button variant="link" className="text-light p-0 border-0" onClick={() => handleModalShow('Privacy Policy', privacyPolicy)}>
                  Privacy Policy
                </Button>
              </Nav.Item>
              <Nav.Item className="mx-2">|</Nav.Item>
              <Nav.Item>
                <Button variant="link" className="text-light p-0 border-0" onClick={() => handleModalShow('Refund Policy', refundPolicy)}>
                  Refund Policy
                </Button>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleModalClose} size="lg" centered>
        <Modal.Header closeButton className="bg-primary text-white modalheaderpolicy">
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <div className="policy-content p-3 rounded" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            {modalContent.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className='modalfooterpolicy'>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </footer>
  );
};

export default Footer;