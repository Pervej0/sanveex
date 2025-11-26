"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-6 sm:space-y-8">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
                Get in Touch
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed">
                Have questions about our products or partnership opportunities? We&apos;re here to help.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-4 p-4 sm:p-6 rounded-2xl bg-white border border-slate-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-fade-in-up stagger-1">
                <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 text-primary shrink-0">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-base sm:text-lg mb-1">Headquarters</h3>
                  <p className="text-slate-600 text-sm sm:text-base">123 Innovation Drive, Tech Park, NY 10001</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 sm:p-6 rounded-2xl bg-white border border-slate-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-fade-in-up stagger-2">
                <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-teal-500/10 to-teal-600/10 text-accent shrink-0">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-base sm:text-lg mb-1">Phone</h3>
                  <p className="text-slate-600 text-sm sm:text-base">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 sm:p-6 rounded-2xl bg-white border border-slate-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-fade-in-up stagger-3">
                <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 text-purple-600 shrink-0">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-base sm:text-lg mb-1">Email</h3>
                  <p className="text-slate-600 text-sm sm:text-base">contact@sanveex.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="shadow-xl border-slate-200 hover:shadow-2xl hover:border-primary/20 transition-all duration-300 animate-fade-in-up stagger-2">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">Send us a Message</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Fill out the form below and our team will get back to you shortly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="text-sm font-medium text-slate-700">First Name</label>
                    <Input 
                      id="first-name" 
                      placeholder="John" 
                      className="focus:border-primary focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last-name" className="text-sm font-medium text-slate-700">Last Name</label>
                    <Input 
                      id="last-name" 
                      placeholder="Doe" 
                      className="focus:border-primary focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    className="focus:border-primary focus:ring-primary/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-slate-700">Message</label>
                  <Textarea 
                    id="message" 
                    placeholder="How can we help you?" 
                    className="min-h-[120px] focus:border-primary focus:ring-primary/20 transition-all" 
                  />
                </div>
                <Button className="w-full gap-2 shadow-lg shadow-primary/20 bg-gradient-primary hover:opacity-90 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                  Send Message
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

