import Image from "next/image";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";

export default function ProductDetails() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h3 className="text-xl font-bold uppercase">
            Find More <span className="text-foreground-accent">Details</span>
          </h3>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Side */}
          <div className="md:col-span-2">
            <Card className="overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1742996111692-2d924f12a058?q=80&w=1170&auto=format&fit=crop"
                alt="Medicine Image"
                width={800}
                height={600}
                className="w-full h-[300px] object-cover"
              />
              <CardContent className="p-5">
                <h2 className="text-2xl font-semibold text-foreground-accent hover:text-foreground-accent/90 mb-3">
                  Medicine Name
                </h2>

                <p className="text-gray-700">
                  <span className="font-medium">Indication:</span> Used for the
                  treatment of fever, body pain, and related symptoms.
                </p>
                <p className="text-gray-700 mt-2">
                  <span className="font-medium">Usage:</span> Take 1 tablet
                  every 8 hours after meals, or as prescribed by a physician.
                </p>
                <p className="text-gray-700 mt-2">
                  <span className="font-medium">Other Details:</span> Keep in a
                  cool and dry place. Store below 25°C. Keep away from children.
                </p>

                <Button
                  className="mt-5 w-fit bg-foreground-accent hover:bg-foreground-accent/90"
                  variant="default"
                >
                  Prescribing Information
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Side (Others list) */}
          <div>
            <h3 className="text-xl font-semibold my-3 border-b pb-2 border-gray-400">
              Others
            </h3>

            {[1, 2, 3].map((_, i) => (
              <Card key={i} className="mb-4">
                <CardContent className="flex gap-3 items-center">
                  <Image
                    src="https://images.unsplash.com/photo-1742996111692-2d924f12a058?q=80&w=1170&auto=format&fit=crop"
                    width={150}
                    height={120}
                    alt="Medicine"
                    className="rounded-lg w-[150px] h-[120px] object-cover"
                  />
                  <div>
                    <h6 className="text-[15px] font-semibold">
                      Medicine No. {i + 1}
                    </h6>
                    <span className="text-sm text-gray-600">
                      Anesthesiology
                    </span>
                    <div>
                      <a
                        href="/product/single"
                        className="text-foreground-accent mt-1 inline-block text-sm hover:underline"
                      >
                        Product Details
                      </a>
                    </div>
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
