import { parseCookies  } from 'nookies'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import { BASE_URL } from '../../constants/api'

const Admin = ({enquiries, contacts}) => {

	if (enquiries || contacts == 0) {
		console.log("Empty enquiries", "empty contacts")	
	} 

	return (
		<Container fluid className="p-0">
			<Tabs defaultActiveKey="enquiries" >
				<Tab eventKey="enquiries" title="Enquiries">
					{enquiries.map(enquiry => (
						<Container key={enquiry.id} className="establishment-container" >
							<Row className="establishment-specific">
								<Col xs={12} md={9}>
									<h3>{enquiry.firstname} {enquiry.lastname}</h3>
									<p>{enquiry.establishmentName}</p>
									<p>{enquiry.email}</p>
									<p>Check in: {enquiry.startDate}</p>
									<p>Check out: {enquiry.endDate}</p>
								</Col>
							</Row>
					</Container>
					))}
				</Tab>

				<Tab eventKey="contact" title="Contact">
					{contacts.map(contact => (
						<div key={contact.id}>
							<p>{contact.firstname} {contact.lastname}</p>
							<p>{contact.email}</p>
							<p>{contact.message}</p>
						</div>
					))}	
				</Tab>

				<Tab eventKey="createEstablishment" title="Create new establishment">
				<h1>Create new establishment</h1>
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

			.nav a {
				color: white;
			}
			
			`}
		</style>

		</Container>

	);
  };

  export async function getServerSideProps(ctx) {
    const token = parseCookies(ctx).token

	
    const [enquiriesRes, contactsRes] = await Promise.all([
		fetch(`${BASE_URL}/enquiries`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}),
		fetch(`${BASE_URL}/contacts`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
	]);
	
    	const [enquiries, contacts] = await  Promise.all ([
			enquiriesRes.json(),
			contactsRes.json()
		]);

	
		
	return { props: { enquiries: enquiries, contacts } };
}

export default Admin;



