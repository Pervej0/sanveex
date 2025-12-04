import ContactFormAndMap from "@/src/components/contactUs/ContactFormAndMap";
import ContactThrough from "@/src/components/contactUs/ContactThrough";

const ContactUs = () => {
  return (
    <>
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary uppercase">
              Connect <span className="text-primary uppercase">With Us</span>
            </h3>
          </div>
        </div>
      </section>
      <ContactThrough />
      <ContactFormAndMap />
    </>
  );
};

export default ContactUs;
