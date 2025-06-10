'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { adminService } from '@/services/admin.service';
import { 
  Plus,
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  DollarSign,
  Users,
  Edit,
  Trash2,
  Eye,
  Clock,
  AlertCircle,
  X
} from 'lucide-react';

interface Event {
  _id: string;
  eventName: string;
  description: string;
  price: number;
  location: {
    venue: string;
    address: string;
    city: string;
    state: string;
  };
  capacity: number;
  availableSeats: number;
  eventDate: string;
  eventTime: string;
  duration: number;
  category: string;
  organizer: string;
  requirements?: string[];
  isActive: boolean;
  createdAt: string;
}

interface EventFormData {
  eventName: string;
  description: string;
  price: number;
  venue: string;
  address: string;
  city: string;
  state: string;
  capacity: number;
  eventDate: string;
  eventTime: string;
  duration: number;
  category: string;
  organizer: string;
  requirements: string[];
}

interface ValidationErrors {
  eventName?: string;
  description?: string;
  price?: string;
  venue?: string;
  address?: string;
  city?: string;
  state?: string;
  capacity?: string;
  eventDate?: string;
  eventTime?: string;
  duration?: string;
  organizer?: string;
}

const categories = [
  'conference',
  'workshop', 
  'seminar',
  'networking',
  'entertainment',
  'sports',
  'other'
];

export default function EventsPage() {
  const searchParams = useSearchParams();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<EventFormData>({
    eventName: '',
    description: '',
    price: 0,
    venue: '',
    address: '',
    city: '',
    state: '',
    capacity: 1,
    eventDate: '',
    eventTime: '',
    duration: 1,
    category: 'conference',
    organizer: '',
    requirements: []
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    fetchEvents();
    
    // Check if create action is requested
    if (searchParams.get('action') === 'create') {
      setShowCreateModal(true);
    }
  }, [currentPage, searchParams]);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllEvents(currentPage, 10);
      setEvents(response.events || []);
      setTotalPages(response.totalPages || 1);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch events');
      // Set empty array if fetch fails
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event =>
    event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'capacity' || name === 'duration' 
        ? parseFloat(value) || 0 
        : value
    }));

    // Real-time validation
    const error = validateField(name, value);
    setValidationErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      setFormError('Please fix the validation errors below');
      return;
    }

    setFormLoading(true);
    setFormError('');

    try {
      if (selectedEvent) {
        await adminService.updateEvent(selectedEvent._id, formData);
        setSuccessMessage('Event updated successfully!');
        setShowEditModal(false);
      } else {
        await adminService.createEvent(formData);
        setSuccessMessage('Event created successfully!');
        setShowCreateModal(false);
      }
      
      fetchEvents();
      resetForm();
    } catch (err: any) {
      setFormError(err.message || 'Failed to save event');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const response = await adminService.deleteEvent(eventId);
      
      setSuccessMessage('Event deleted successfully');
      
      // Refresh events list
      await fetchEvents();
    } catch (err: any) {
      alert(err.message || 'Failed to delete event');
    }
  };

  const resetForm = () => {
    setFormData({
      eventName: '',
      description: '',
      price: 0,
      venue: '',
      address: '',
      city: '',
      state: '',
      capacity: 1,
      eventDate: '',
      eventTime: '',
      duration: 1,
      category: 'conference',
      organizer: '',
      requirements: []
    });
    setFormError('');
    setSuccessMessage('');
  };

  const openEditModal = (event: Event) => {
    setSelectedEvent(event);
    setFormData({
      eventName: event.eventName,
      description: event.description,
      price: event.price,
      venue: event.location.venue,
      address: event.location.address,
      city: event.location.city,
      state: event.location.state,
      capacity: event.capacity,
      eventDate: event.eventDate.split('T')[0],
      eventTime: event.eventTime,
      duration: event.duration,
      category: event.category,
      organizer: event.organizer,
      requirements: event.requirements || []
    });
    setFormError('');
    setSuccessMessage('');
    setShowEditModal(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'capacity' || name === 'duration' ? Number(value) : value
    }));
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req)
    }));
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  // Real-time validation function
  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'eventName':
        if (!value || value.length < 3) return 'Event name must be at least 3 characters long';
        if (value.length > 100) return 'Event name must not exceed 100 characters';
        return '';
      
      case 'description':
        if (!value || value.length < 10) return 'Description must be at least 10 characters long';
        if (value.length > 1000) return 'Description must not exceed 1000 characters';
        return '';
      
      case 'price':
        if (value < 0) return 'Price cannot be negative';
        return '';
      
      case 'venue':
        if (!value || value.trim() === '') return 'Venue is required';
        return '';
      
      case 'address':
        if (!value || value.trim() === '') return 'Address is required';
        return '';
      
      case 'city':
        if (!value || value.trim() === '') return 'City is required';
        return '';
      
      case 'state':
        if (!value || value.trim() === '') return 'State is required';
        return '';
      
      case 'capacity':
        if (!value || value < 1) return 'Capacity must be at least 1';
        return '';
      
      case 'eventDate':
        if (!value) return 'Event date is required';
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate <= today) return 'Event date must be in the future';
        return '';
      
      case 'eventTime':
        if (!value) return 'Event time is required';
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(value)) return 'Time must be in HH:MM format';
        return '';
      
      case 'duration':
        if (!value || value < 1) return 'Duration must be at least 1 hour';
        if (value > 24) return 'Duration cannot exceed 24 hours';
        return '';
      
      case 'organizer':
        if (!value || value.trim() === '') return 'Organizer name is required';
        return '';
      
      default:
        return '';
    }
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    
    Object.keys(formData).forEach((key) => {
      if (key !== 'requirements') {
        const error = validateField(key, formData[key as keyof EventFormData]);
        if (error) {
          errors[key as keyof ValidationErrors] = error;
        }
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  if (loading && events.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Events Management</h1>
          <p className="mt-2 text-gray-600">Create and manage events on your platform</p>
        </div>
        <button
          onClick={() => {
            setShowCreateModal(true);
            setFormError('');
            setSuccessMessage('');
          }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
        >
          <Plus className="h-5 w-5" />
          <span>Create Event</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events by name, description, city, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="h-5 w-5 bg-green-400 rounded-full mr-2 flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <p className="text-green-700">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            onEdit={() => openEditModal(event)}
            onDelete={() => handleDeleteEvent(event._id)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && !loading && (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-gray-200">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No events found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating your first event.'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => {
                setShowCreateModal(true);
                setFormError('');
                setSuccessMessage('');
              }}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Event
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Create Event Modal */}
      {showCreateModal && (
        <EventFormModal
          isOpen={showCreateModal}
          onClose={() => {
            setShowCreateModal(false);
            resetForm();
          }}
          title="Create New Event"
          formData={formData}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          loading={formLoading}
          error={formError}
          validationErrors={validationErrors}
        />
      )}

      {/* Edit Event Modal */}
      {showEditModal && (
        <EventFormModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedEvent(null);
            resetForm();
          }}
          title="Edit Event"
          formData={formData}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          loading={formLoading}
          error={formError}
          validationErrors={validationErrors}
        />
      )}
    </div>
  );
}

function EventCard({ event, onEdit, onDelete }: {
  event: Event;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{event.eventName}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">{event.description}</p>
          </div>
          <div className="flex space-x-2 ml-4">
            <button
              onClick={onEdit}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date(event.eventDate).toLocaleDateString()} at {event.eventTime}
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {event.location.venue}, {event.location.city}
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="h-4 w-4 mr-2" />
            ₹{event.price.toLocaleString()}
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            {event.availableSeats}/{event.capacity} seats available
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            {event.duration} hour{event.duration > 1 ? 's' : ''}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {event.category}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            event.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {event.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
    </div>
  );
}

function EventFormModal({ 
  isOpen, 
  onClose, 
  title, 
  formData, 
  onChange, 
  onSubmit, 
  loading, 
  error, 
  validationErrors
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  formData: EventFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string;
  validationErrors: ValidationErrors;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
        
        <form onSubmit={onSubmit} className="p-6 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Event Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Name *
            </label>
            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={onChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                validationErrors.eventName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter event name"
            />
            <div className="flex justify-between items-center mt-1">
              <span className={`text-xs ${validationErrors.eventName ? 'text-red-600' : 'text-gray-500'}`}>
                {validationErrors.eventName || 'Minimum 3 characters, maximum 100'}
              </span>
              <span className="text-xs text-gray-400">
                {formData.eventName.length}/100
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onChange}
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                validationErrors.description ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Describe your event"
            />
            <div className="flex justify-between items-center mt-1">
              <span className={`text-xs ${validationErrors.description ? 'text-red-600' : 'text-gray-500'}`}>
                {validationErrors.description || 'Minimum 10 characters, maximum 1000'}
              </span>
              <span className="text-xs text-gray-400">
                {formData.description.length}/1000
              </span>
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={onChange}
              min="0"
              step="0.01"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                validationErrors.price ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="0.00"
            />
            {validationErrors.price && (
              <span className="text-xs text-red-600">{validationErrors.price}</span>
            )}
            {!validationErrors.price && (
              <span className="text-xs text-gray-500">Must be 0 or greater</span>
            )}
          </div>

          {/* Location Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Venue *
              </label>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={onChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.venue ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Event venue"
              />
              {validationErrors.venue && (
                <span className="text-xs text-red-600">{validationErrors.venue}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={onChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.address ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Full address"
              />
              {validationErrors.address && (
                <span className="text-xs text-red-600">{validationErrors.address}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={onChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.city ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="City"
              />
              {validationErrors.city && (
                <span className="text-xs text-red-600">{validationErrors.city}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State *
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={onChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.state ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="State"
              />
              {validationErrors.state && (
                <span className="text-xs text-red-600">{validationErrors.state}</span>
              )}
            </div>
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Capacity *
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={onChange}
              min="1"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                validationErrors.capacity ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Maximum attendees"
            />
            {validationErrors.capacity && (
              <span className="text-xs text-red-600">{validationErrors.capacity}</span>
            )}
            {!validationErrors.capacity && (
              <span className="text-xs text-gray-500">Minimum 1 person</span>
            )}
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Date *
              </label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={onChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.eventDate ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {validationErrors.eventDate && (
                <span className="text-xs text-red-600">{validationErrors.eventDate}</span>
              )}
              {!validationErrors.eventDate && (
                <span className="text-xs text-gray-500">Must be a future date</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Time *
              </label>
              <input
                type="time"
                name="eventTime"
                value={formData.eventTime}
                onChange={onChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.eventTime ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {validationErrors.eventTime && (
                <span className="text-xs text-red-600">{validationErrors.eventTime}</span>
              )}
              {!validationErrors.eventTime && (
                <span className="text-xs text-gray-500">24-hour format (HH:MM)</span>
              )}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (hours) *
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={onChange}
              min="1"
              max="24"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                validationErrors.duration ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Duration in hours"
            />
            {validationErrors.duration && (
              <span className="text-xs text-red-600">{validationErrors.duration}</span>
            )}
            {!validationErrors.duration && (
              <span className="text-xs text-gray-500">Between 1 and 24 hours</span>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            <span className="text-xs text-gray-500">
              Select the most appropriate category
            </span>
          </div>

          {/* Organizer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Organizer *
            </label>
            <input
              type="text"
              name="organizer"
              value={formData.organizer}
              onChange={onChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                validationErrors.organizer ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Organizer name or company"
            />
            {validationErrors.organizer && (
              <span className="text-xs text-red-600">{validationErrors.organizer}</span>
            )}
            {!validationErrors.organizer && (
              <span className="text-xs text-gray-500">Name of the organizing person or company</span>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Saving...' : (title.includes('Create') ? 'Create Event' : 'Update Event')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 