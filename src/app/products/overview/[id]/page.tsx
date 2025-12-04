import Image from "next/image";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";

export default function ProductDetails() {
  return (
    <section className="py-10 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10 max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary uppercase">
            Find More <span className="text-primary">Details</span>
          </h3>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Left Side */}
          <div className="md:col-span-2">
            <Card className="overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1742996111692-2d924f12a058?q=80&w=1170&auto=format&fit=crop"
                alt="Medicine Image"
                width={800}
                height={600}
                className="w-full h-[250px] md:h-[300px] object-cover"
              />
              <CardContent className="p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-semibold text-primary hover:text-primary/90 mb-3">
                  Medicine Name
                </h2>

                <p className="text-foreground">
                  <span className="font-medium">Indication:</span> Used for the
                  treatment of fever, body pain, and related symptoms.
                </p>

                <p className="text-foreground mt-2">
                  <span className="font-medium">Usage:</span> Take 1 tablet
                  every 8 hours after meals, or as prescribed by a physician.
                </p>

                <p className="text-foreground mt-2">
                  <span className="font-medium">Other Details:</span> Keep in a
                  cool and dry place. Store below 25°C. Keep away from children.
                </p>

                <Button className="mt-5 w-fit bg-primary hover:bg-primary/90">
                  Prescribing Information
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Side (Others list) */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold my-3 pb-2 text-primary border-b border-border">
              Others
            </h3>

            {[1, 2, 3].map((_, i) => (
              <Card key={i} className="mb-4">
                <CardContent className="flex gap-3 items-center p-3">
                  <Image
                    src="https://images.unsplash.com/photo-1742996111692-2d924f12a058?q=80&w=1170&auto=format&fit=crop"
                    width={150}
                    height={120}
                    alt="Medicine"
                    className="rounded-lg w-[120px] md:w-[150px] h-[100px] md:h-[120px] object-cover"
                  />

                  <div>
                    <h6 className="text-sm md:text-[15px] font-semibold text-foreground">
                      Medicine No. {i + 1}
                    </h6>

                    <span className="text-sm text-muted-foreground">
                      Anesthesiology
                    </span>

                    <a
                      href="/product/single"
                      className="text-primary mt-1 inline-block text-sm hover:underline"
                    >
                      Product Details
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
