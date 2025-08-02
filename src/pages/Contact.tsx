import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, HelpCircle, Bug } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', category: 'general', message: '' });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'support@garagebook.com',
      action: 'mailto:support@garagebook.com'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our team',
      contact: 'Available 24/7',
      action: '#'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak with our team',
      contact: '+1 (555) 123-4567',
      action: 'tel:+15551234567'
    }
  ];

  const faqItems = [
    {
      icon: HelpCircle,
      question: 'How do I add a vehicle to my garage?',
      answer: 'Navigate to "My Garage" and click the "Add Vehicle" button. Fill out the form with your vehicle details, photos, and modifications.'
    },
    {
      icon: Bug,
      question: 'I found a bug. How do I report it?',
      answer: 'Please use the contact form below and select "Bug Report" as the category. Include as much detail as possible about the issue.'
    },
    {
      icon: MessageCircle,
      question: 'How do I change my notification settings?',
      answer: 'Go to Settings > Notifications to customize what notifications you receive and how you receive them.'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have a question, suggestion, or need help? We're here to assist you. 
            Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Methods */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold text-white mb-8">Contact Methods</h2>
            
            <div className="space-y-6 mb-12">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.action}
                  className="block p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors group"
                >
                  <div className="flex items-start space-x-4">
                    <method.icon className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-white font-medium mb-1 group-hover:text-yellow-400 transition-colors">
                        {method.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">{method.description}</p>
                      <p className="text-gray-300 font-medium">{method.contact}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Office Info */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-medium mb-2">Headquarters</h3>
                  <p className="text-gray-400 leading-relaxed">
                    123 Auto Street<br />
                    Car City, CA 90210<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
              <h2 className="text-2xl font-semibold text-white mb-8">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="bug">Bug Report</option>
                      <option value="feature">Feature Request</option>
                      <option value="business">Business Inquiry</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                    placeholder="Please provide as much detail as possible..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-6 py-4 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors font-semibold text-lg"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-white mb-8">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <div className="flex items-start space-x-4">
                      <item.icon className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-white font-medium mb-2">{item.question}</h3>
                        <p className="text-gray-400 leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}