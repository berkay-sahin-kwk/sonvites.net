import React from 'react';
import { Car, Users, Heart, TrendingUp, Shield, Zap } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Car,
      title: 'Showcase Your Rides',
      description: 'Create detailed profiles for each of your vehicles with photos, specs, and modification lists.'
    },
    {
      icon: Users,
      title: 'Connect with Enthusiasts',
      description: 'Follow other car lovers, discover amazing builds, and share your passion with the community.'
    },
    {
      icon: Heart,
      title: 'Engage & Interact',
      description: 'Like, comment, and discuss builds with fellow enthusiasts who share your automotive interests.'
    },
    {
      icon: TrendingUp,
      title: 'Track Your Progress',
      description: 'Document your build journey and see how your vehicles evolve over time.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is protected with industry-standard security measures and privacy controls.'
    },
    {
      icon: Zap,
      title: 'Fast & Responsive',
      description: 'Optimized for speed across all devices - desktop, tablet, and mobile.'
    }
  ];

  const stats = [
    { label: 'Active Users', value: '10,000+' },
    { label: 'Vehicles Shared', value: '25,000+' },
    { label: 'Communities', value: '500+' },
    { label: 'Countries', value: '45+' }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-6">
            <Car className="h-16 w-16 text-yellow-400" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome to <span className="text-yellow-400">GarageBook</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            The ultimate social platform for car enthusiasts. Share your builds, discover amazing rides, 
            and connect with a community that shares your passion for automotive excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="px-8 py-4 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors font-semibold text-lg"
            >
              Join the Community
            </a>
            <a
              href="/explore"
              className="px-8 py-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold text-lg border border-gray-700"
            >
              Explore Garages
            </a>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need to Share Your Passion
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              GarageBook provides all the tools you need to showcase your vehicles and connect with like-minded enthusiasts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-8 border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="flex items-center mb-4">
                  <feature.icon className="h-8 w-8 text-yellow-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                </div>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gray-900 rounded-2xl p-12 border border-gray-800 mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              At GarageBook, we believe that every car has a story and every enthusiast deserves a platform to share their passion. 
              We're building more than just a social network – we're creating a global community where automotive culture thrives, 
              knowledge is shared, and connections are made that last a lifetime.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Whether you're a weekend warrior with a project car, a professional builder showcasing your work, or someone who simply 
              loves to admire beautiful machines, GarageBook is your home in the digital automotive world.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-white mb-4">Built by Enthusiasts, for Enthusiasts</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Our team consists of passionate car enthusiasts who understand what the community needs. 
            We're constantly working to improve the platform and add new features that help you better 
            showcase your builds and connect with fellow gearheads.
          </p>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">Ready to Share Your Garage?</h2>
          <p className="text-lg text-black mb-8 opacity-90">
            Join thousands of car enthusiasts who are already sharing their passion on GarageBook.
          </p>
          <a
            href="/register"
            className="inline-block px-8 py-4 bg-black text-yellow-400 rounded-lg hover:bg-gray-900 transition-colors font-semibold text-lg"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </div>
  );
}