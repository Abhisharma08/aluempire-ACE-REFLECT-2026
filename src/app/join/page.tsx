"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Mail, Phone, Building2, MapPin, Loader2, Sparkles, CheckCircle2, Package } from "lucide-react";

export default function JoinPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: formData.get("company") as string,
      city: formData.get("city") as string,
      product_interest: formData.get("product_interest") as string,
      opt_in: formData.get("opt_in") === "on" ? "TRUE" : "FALSE",
    };

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit registration");
      }

      form.reset();
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 py-8 lg:py-12 relative">
      {/* Success Popup Toast */}
      {isSuccess && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-800">
            <CheckCircle2 className="w-5 h-5 text-amber-400" />
            <span className="font-medium">Data saved successfully!</span>
          </div>
        </div>
      )}

      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden grid grid-cols-1 lg:grid-cols-5">
        
        {/* Header / Left Column */}
        <div className="relative bg-slate-900 p-8 lg:p-12 pb-16 lg:pb-12 flex flex-col justify-center text-white text-center lg:text-left lg:col-span-2 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 lg:h-full lg:w-1 lg:right-auto"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col items-center lg:items-start">
            <div className="mb-8 flex items-center justify-center lg:justify-start">
              <img 
                src="https://res.cloudinary.com/ddqqlfsjp/image/upload/v1752230081/Alu_Empire_Logo-removebg-preview_nrlo91.png" 
                alt="Alu Empire Logo" 
                className="h-24 w-auto object-contain brightness-0 invert" 
              />
            </div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-wider text-amber-300 mb-6 uppercase">
              <span>18-19 July 2026</span>
              <span className="w-1 h-1 rounded-full bg-amber-400/50"></span>
              <span>Booth J-1</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">ACE REFLECT 2026</h1>
            <h2 className="text-lg font-medium text-amber-400 mb-6 tracking-wide uppercase">Alu Empire & ISTO Furniture</h2>
            
            <p className="text-slate-300 max-w-sm mx-auto lg:mx-0 text-sm leading-relaxed">
              Thank you for visiting us! Drop your details below so we can share our premium architectural solutions with you.
            </p>
          </div>
        </div>

        {/* Form / Right Column */}
        <div className="lg:col-span-3 bg-white relative z-20 rounded-t-3xl -mt-8 lg:mt-0 lg:rounded-t-none lg:rounded-l-3xl lg:-ml-6 shadow-[-10px_0_30px_rgba(0,0,0,0.1)] lg:shadow-[-20px_0_40px_rgba(0,0,0,0.15)] flex flex-col justify-center">
          <form onSubmit={onSubmit} className="p-8 lg:p-12 space-y-8">
            {error && (
              <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 shrink-0"></div>
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input name="name" required placeholder="Your name" className="pl-9 bg-gray-50/50 border-gray-200 h-11 rounded-xl focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input name="email" type="email" required placeholder="Your Email" className="pl-9 bg-gray-50/50 border-gray-200 h-11 rounded-xl focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input name="phone" type="tel" placeholder="Phone Number" className="pl-9 bg-gray-50/50 border-gray-200 h-11 rounded-xl focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Company</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input name="company" placeholder="Company Name" className="pl-9 bg-gray-50/50 border-gray-200 h-11 rounded-xl focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">City</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input name="city" placeholder="City" className="pl-9 bg-gray-50/50 border-gray-200 h-11 rounded-xl focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Product you are interested in</label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select 
                    name="product_interest"
                    defaultValue=""
                    className="w-full pl-9 pr-4 py-2 bg-gray-50/50 border border-gray-200 h-11 rounded-xl text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 appearance-none"
                  >
                    <option value="" disabled>Select a product...</option>
                    <option value="Aluminium Systems">Premium Architectural Aluminium Systems</option>
                    <option value="Glass Partitions">Glass Partitions</option>
                    <option value="Doors & Windows">Doors & Windows</option>
                    <option value="Bespoke Furniture">Bespoke Furniture Solutions (ISTO)</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50/80 border border-slate-200 p-5 rounded-xl">
              <div className="flex items-start space-x-3">
                <Checkbox name="opt_in" id="opt-in" defaultChecked className="mt-1 w-5 h-5 border-slate-400 data-[state=checked]:bg-slate-900 data-[state=checked]:text-amber-400 rounded" />
                <div>
                  <label htmlFor="opt-in" className="block text-sm font-semibold text-slate-900 cursor-pointer">
                    Yes, I'd like to receive the welcome email
                  </label>
                  <p className="text-xs text-slate-500 mt-1">
                    By checking this box, you agree to receive follow-up communications from Alu Empire & ISTO Furniture. You can unsubscribe at any time.
                  </p>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full h-12 text-base font-medium rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 shadow-lg shadow-slate-200 transition-all active:scale-[0.98]"
            >
              {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin text-amber-400" /> : null}
              Submit Now
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
