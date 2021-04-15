import { parseCookies  } from 'nookies'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import { BASE_URL } from '../../constants/api'
import FileUpload from './../../components/admin/establishment/FieldUpload';
import ImageUpload from '../../components/admin/establishment/ImageUpload'

const Admin = ({enquiries, contacts, establishments, formData}) => {
console.log(formData)

	return (
		<Container fluid className="p-0">
			<Tabs defaultActiveKey="enquiries" >
				<Tab eventKey="enquiries" title="Enquiries">
					<Container>	<h1>Enquiries</h1></Container>
					{enquiries.map(enquiry => ( 
						<Container key={enquiry.id} className="establishment-container" >	
							<Row className="establishment-specific">
								<Col xs={12} md={9} className="mt-5">
									<p>Name: {enquiry.firstname} {enquiry.lastname}</p>
									<p>Establishment: {enquiry.establishmentName}</p>
									<p>Email: {enquiry.email}</p>
									<p>Check in: {enquiry.startDate}</p>
									<p>Check out: {enquiry.endDate}</p>
								</Col>
							</Row>
					</Container>
					))}
				</Tab>

				<Tab eventKey="contact" title="Contact">
				<Container>	<h1>Contact messages</h1></Container>
					{contacts.map(contact => (
						<Container key={contact.id} className="establishment-container" >
						<Row className="establishment-specific">
							<Col xs={12} md={9} className="mt-5">
								<p>Name: {contact.firstname} {contact.lastname}</p>
								<p>Email: {contact.email}</p>
								<p>Message: {contact.message}</p>
							</Col>
						</Row>
				</Container>
					))}	
				</Tab>

				<Tab eventKey="createEstablishment" title="Create new establishment">
					<Container>
						<h1>Create new establishment</h1>
						<FileUpload  />
						<ImageUpload {...establishments} />
					</Container>
				</Tab>
			</Tabs>
			<style global jsx >
			{`
				.main {
					height: auto;
					min-height: 100vh;
				}
					
				.nav-tabs {
					color: white; 
					background: black;
					display: flex;
					justify-content: space-evenly;
					margin-bottom: 5rem;
				}
			`}
		</style>

		</Container>

	);
  };

  export async function getServerSideProps(ctx) {
    const token = parseCookies(ctx).token
    const [enquiriesRes, contactsRes, establishmentsRes] = await Promise.all([
		fetch(`${BASE_URL}/enquiries`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}),
		fetch(`${BASE_URL}/contacts`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}),
		fetch(`${BASE_URL}/establishments`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
	]);
    	const [enquiries, contacts, establishments] = await  Promise.all ([
			enquiriesRes.json(),
			contactsRes.json(),
			establishmentsRes.json()
		]);		
	return { props: { enquiries, contacts, establishments } };
}

export default Admin;



