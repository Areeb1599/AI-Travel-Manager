import React, { useState } from 'react';
import { MapPin, Calendar, Users, Plane, Hotel, Camera, Clock, Star, DollarSign, Navigation, Sun, Coffee, Mountain } from 'lucide-react';

function App() {
  const TravelPlanner = () => {
    const [activeTab, setActiveTab] = useState('plan');
    const [formData, setFormData] = useState({
      destination: '',
      startDate: '',
      endDate: '',
      travelers: 1,
      budget: 'medium',
      interests: []
    });
    const [generatedPlan, setGeneratedPlan] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const interests = [
      { id: 'culture', label: 'Culture & History', icon: Camera },
      { id: 'adventure', label: 'Adventure', icon: Mountain },
      { id: 'food', label: 'Food & Dining', icon: Coffee },
      { id: 'nightlife', label: 'Nightlife', icon: Sun },
      { id: 'nature', label: 'Nature', icon: Navigation },
      { id: 'shopping', label: 'Shopping', icon: DollarSign }
    ];

    const budgetOptions = [
      { value: 'budget', label: 'Budget', range: '$50-100/day' },
      { value: 'medium', label: 'Medium', range: '$100-250/day' },
      { value: 'luxury', label: 'Luxury', range: '$250+/day' }
    ];

    const sampleDestinations = [
      'Tokyo, Japan', 'Paris, France', 'New York, USA', 'Bali, Indonesia',
      'Rome, Italy', 'Barcelona, Spain', 'London, UK', 'Bangkok, Thailand'
    ];

    const handleInputChange = (field, value) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleInterest = (interestId) => {
      setFormData(prev => ({
        ...prev,
        interests: prev.interests.includes(interestId)
          ? prev.interests.filter(id => id !== interestId)
          : [...prev.interests, interestId]
      }));
    };

    const generatePlan = () => {
      if (!formData.destination || !formData.startDate || !formData.endDate) {
        alert('Please fill in destination and dates');
        return;
      }

      setIsLoading(true);
      
      // Simulate AI processing
      setTimeout(() => {
        const mockPlan = {
          destination: formData.destination,
          duration: Math.max(1, Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24))),
          totalBudget: formData.budget === 'budget' ? 75 : formData.budget === 'medium' ? 175 : 350,
          itinerary: [
            {
              day: 1,
              title: 'Arrival & City Exploration',
              activities: [
                { time: '10:00 AM', activity: 'Airport pickup and hotel check-in', type: 'transport' },
                { time: '2:00 PM', activity: 'Walking tour of historic district', type: 'culture' },
                { time: '7:00 PM', activity: 'Welcome dinner at local restaurant', type: 'food' }
              ]
            },
            {
              day: 2,
              title: 'Cultural Immersion',
              activities: [
                { time: '9:00 AM', activity: 'Visit famous museum', type: 'culture' },
                { time: '1:00 PM', activity: 'Local market food tour', type: 'food' },
                { time: '6:00 PM', activity: 'Traditional performance show', type: 'culture' }
              ]
            },
            {
              day: 3,
              title: 'Adventure Day',
              activities: [
                { time: '8:00 AM', activity: 'Day trip to nearby attractions', type: 'adventure' },
                { time: '12:00 PM', activity: 'Scenic lunch with views', type: 'nature' },
                { time: '4:00 PM', activity: 'Return to city', type: 'transport' }
              ]
            }
          ],
          recommendations: {
            hotels: [
              { name: 'Grand Plaza Hotel', rating: 4.8, price: '$180/night', features: ['WiFi', 'Pool', 'Gym'] },
              { name: 'Boutique Central', rating: 4.5, price: '$120/night', features: ['WiFi', 'Restaurant', 'Spa'] }
            ],
            restaurants: [
              { name: 'Local Flavors', cuisine: 'Traditional', rating: 4.7, price: '$$' },
              { name: 'Modern Bistro', cuisine: 'International', rating: 4.6, price: '$$$' }
            ]
          }
        };
        
        setGeneratedPlan(mockPlan);
        setIsLoading(false);
        setActiveTab('itinerary');
      }, 1200);
    };

    const getActivityIcon = (type) => {
      const icons = {
        transport: Plane,
        culture: Camera,
        food: Coffee,
        adventure: Mountain,
        nature: Navigation
      };
      const Icon = icons[type] || MapPin;
      return <Icon className="w-4 h-4" />;
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Travel Planner
                </h1>
              </div>
              
              <nav className="flex space-x-1 bg-gray-100 rounded-full p-1">
                {[
                  { id: 'plan', label: 'Plan Trip', icon: MapPin },
                  { id: 'itinerary', label: 'Itinerary', icon: Calendar },
                  { id: 'recommendations', label: 'Recommendations', icon: Star }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-white shadow-md text-blue-600'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          {activeTab === 'plan' && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Plan Your Perfect Trip
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Let our AI create a personalized itinerary based on your preferences and interests
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-xl p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Destination */}
                  <div className="space-y-4">
                    <label className="flex items-center space-x-2 text-lg font-semibold text-gray-700">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <span>Destination</span>
                    </label>
                    <input
                      type="text"
                      value={formData.destination}
                      onChange={(e) => handleInputChange('destination', e.target.value)}
                      placeholder="Where do you want to go?"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      list="destinations"
                    />
                    <datalist id="destinations">
                      {sampleDestinations.map(dest => (
                        <option key={dest} value={dest} />
                      ))}
                    </datalist>
                  </div>

                  {/* Travelers */}
                  <div className="space-y-4">
                    <label className="flex items-center space-x-2 text-lg font-semibold text-gray-700">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span>Travelers</span>
                    </label>
                    <select
                      value={formData.travelers}
                      onChange={(e) => handleInputChange('travelers', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    >
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Traveler' : 'Travelers'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dates */}
                  <div className="space-y-4">
                    <label className="flex items-center space-x-2 text-lg font-semibold text-gray-700">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span>Start Date</span>
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-center space-x-2 text-lg font-semibold text-gray-700">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span>End Date</span>
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Budget */}
                <div className="mt-8 space-y-4">
                  <label className="flex items-center space-x-2 text-lg font-semibold text-gray-700">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <span>Budget Range</span>
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {budgetOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => handleInputChange('budget', option.value)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          formData.budget === option.value
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="font-semibold">{option.label}</div>
                        <div className="text-sm text-gray-600">{option.range}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div className="mt-8 space-y-4">
                  <label className="flex items-center space-x-2 text-lg font-semibold text-gray-700">
                    <Star className="w-5 h-5 text-blue-600" />
                    <span>Interests</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {interests.map(interest => {
                      const Icon = interest.icon;
                      return (
                        <button
                          key={interest.id}
                          onClick={() => toggleInterest(interest.id)}
                          className={`flex items-center space-x-2 p-3 rounded-xl border-2 transition-all duration-300 ${
                            formData.interests.includes(interest.id)
                              ? 'border-purple-500 bg-purple-50 text-purple-700'
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="font-medium">{interest.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Generate Button */}
                <div className="mt-12 text-center">
                  <button
                    onClick={generatePlan}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Generating Your Perfect Trip...</span>
                      </div>
                    ) : (
                      'Generate AI Travel Plan'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'itinerary' && generatedPlan && (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Your {generatedPlan.duration}-Day Trip to {generatedPlan.destination}
                </h2>
                <p className="text-gray-600">
                  Estimated budget: ${generatedPlan.totalBudget * generatedPlan.duration} total
                </p>
              </div>

              <div className="space-y-8">
                {generatedPlan.itinerary.map(day => (
                  <div key={day.day} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
                      <h3 className="text-xl font-bold">Day {day.day}: {day.title}</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {day.activities.map((activity, idx) => (
                          <div key={idx} className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50">
                            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full flex-shrink-0">
                              {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span className="font-semibold text-blue-600">{activity.time}</span>
                              </div>
                              <p className="text-gray-800">{activity.activity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'recommendations' && generatedPlan && (
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Recommended Places
              </h2>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Hotels */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Hotel className="w-6 h-6 text-blue-600" />
                    <h3 className="text-2xl font-bold text-gray-900">Hotels</h3>
                  </div>
                  <div className="space-y-4">
                    {generatedPlan.recommendations.hotels.map((hotel, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-xl p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-lg text-gray-800">{hotel.name}</h4>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{hotel.rating}</span>
                          </div>
                        </div>
                        <p className="text-blue-600 font-semibold mb-2">{hotel.price}</p>
                        <div className="flex flex-wrap gap-2">
                          {hotel.features.map(feature => (
                            <span key={feature} className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Restaurants */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Coffee className="w-6 h-6 text-blue-600" />
                    <h3 className="text-2xl font-bold text-gray-900">Restaurants</h3>
                  </div>
                  <div className="space-y-4">
                    {generatedPlan.recommendations.restaurants.map((restaurant, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-xl p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-lg text-gray-800">{restaurant.name}</h4>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{restaurant.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-1">{restaurant.cuisine}</p>
                        <p className="text-blue-600 font-semibold">{restaurant.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Empty States */}
          {activeTab === 'itinerary' && !generatedPlan && (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No itinerary yet</h3>
              <p className="text-gray-500">Generate your travel plan first to see your itinerary</p>
            </div>
          )}

          {activeTab === 'recommendations' && !generatedPlan && (
            <div className="text-center py-16">
              <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No recommendations yet</h3>
              <p className="text-gray-500">Generate your travel plan first to see personalized recommendations</p>
            </div>
          )}
        </main>
      </div>
    );
  };

  return <TravelPlanner />;
}

export default App;
