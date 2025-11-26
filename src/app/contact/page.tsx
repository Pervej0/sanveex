import ContactFormAndMap from "@/src/components/contactUs/ContactFormAndMap";
import ContactThrough from "@/src/components/contactUs/ContactThrough";

const ContactUs = () => {
  return (
    <>
      <section className="text-center container pt-20 mb-12">
        <h3 className="text-3xl uppercase md:text-5xl font-bold text-gray-800">
          Connect{" "}
          <span className="text-foreground-accent uppercase">With Us</span>
        </h3>
      </section>
      <ContactThrough />
      <ContactFormAndMap />
    </>
  );
};

export default ContactUs;
