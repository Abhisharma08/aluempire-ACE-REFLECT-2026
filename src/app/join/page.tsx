"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Mail, Phone, Building2, MapPin, Loader2, Sparkles, CheckCircle2 } from "lucide-react";

export default function JoinPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: formData.get("company") as string,
      city: formData.get("city") as string,
      opt_in: formData.get("opt_in") === "on" ? "TRUE" : "FALSE",
    };

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to submit form");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Thank You!</h1>
          <p className="text-gray-600">
            We've successfully received your information. Keep an eye on your inbox for our welcome email!
          </p>
          <Button 
            onClick={() => window.location.reload()} 
            variant="outline" 
            className="w-full mt-4"
          >
            Submit Another Response
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 py-12">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="relative bg-slate-900 p-8 pb-12 overflow-hidden text-white text-center">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-6 flex items-center justify-center">
              <img 
                src="https://res.cloudinary.com/ddqqlfsjp/image/upload/v1752230081/Alu_Empire_Logo-removebg-preview_nrlo91.png" 
                alt="Alu Empire Logo" 
                className="h-24 w-auto object-contain brightness-0 invert" 
              />
            </div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-wider text-amber-300 mb-4 uppercase">
              <span>18-19 July 2026</span>
              <span className="w-1 h-1 rounded-full bg-amber-400/50"></span>
              <span>Booth J-1</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">ACE REFLECT 2026</h1>
            <h2 className="text-lg font-medium text-amber-400 mb-4 tracking-wide uppercase">Alu Empire & ISTO Furniture</h2>
            
            <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed">
              Thank you for visiting us! Drop your details below so we can share our premium architectural solutions with you.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="p-8 -mt-6 relative z-20 bg-white rounded-t-3xl space-y-8">
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
            Submit Registration
          </Button>
        </form>
      </div>
    </div>
  );
}
