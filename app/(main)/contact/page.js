import ContactForm from './ContactForm';

export const metadata = {
  title: 'Contact Us | Premium Contact Reveal',
  description: 'Have questions? Get in touch with us through our contact form.',
};

export default function ContactPage() {
  return (
    <div className="container">
      <ContactForm />
    </div>
  );
}
