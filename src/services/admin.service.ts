import { signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

class AdminService {
  private static instance: AdminService;
  private baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  static getInstance(): AdminService {
    if (!AdminService.instance) {
      AdminService.instance = new AdminService();
    }
    return AdminService.instance;
  }

  // Simplified login for development (no real auth)
  async login(email: string, password: string): Promise<{ success: boolean; token?: string; error?: string }> {
    try {
      // For development - just set a dummy token and test dashboard access
      const response = await fetch(`${this.baseUrl}/api/admin/dashboard`);
      
      if (!response.ok) {
        return { success: false, error: 'Cannot connect to backend. Make sure your server is running.' };
      }
      
      // Store dummy token for session management
      localStorage.setItem('adminToken', 'dev-token');
      return { success: true, token: 'dev-token' };
      
    } catch (error: any) {
      console.error('Admin login error:', error);
      return { success: false, error: 'Cannot connect to backend. Make sure your server is running.' };
    }
  }

  // Check if admin is logged in (simplified for dev)
  isLoggedIn(): boolean {
    const token = localStorage.getItem('adminToken');
    return !!token;
  }

  // Logout admin
  async logout(): Promise<void> {
    localStorage.removeItem('adminToken');
  }

  // Get basic headers for API calls (no auth needed now)
  private getAuthHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
    };
  }

  // Dashboard Stats
  async getDashboardStats(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/api/admin/dashboard`, {
        headers: this.getAuthHeaders(),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }

  // Event Management
  async createEvent(eventData: any): Promise<any> {
    // Format the event data to match backend expectations
    const formattedData = {
      ...eventData,
      location: {
        venue: eventData.venue,
        address: eventData.address,
        city: eventData.city,
        state: eventData.state
      }
    };
    
    // Remove flat location fields
    delete formattedData.venue;
    delete formattedData.address;
    delete formattedData.city;
    delete formattedData.state;

    const response = await fetch(`${this.baseUrl}/api/admin/events`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(formattedData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create event');
    }

    return response.json();
  }

  async updateEvent(eventId: string, eventData: any): Promise<any> {
    // Format the event data to match backend expectations
    const formattedData = {
      ...eventData,
      location: {
        venue: eventData.venue,
        address: eventData.address,
        city: eventData.city,
        state: eventData.state
      }
    };
    
    // Remove flat location fields
    delete formattedData.venue;
    delete formattedData.address;
    delete formattedData.city;
    delete formattedData.state;

    const response = await fetch(`${this.baseUrl}/api/admin/events/${eventId}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(formattedData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update event');
    }

    return response.json();
  }

  async deleteEvent(eventId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/api/admin/events/${eventId}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete event');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }

  async getAllEvents(page = 1, limit = 10): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/api/events?page=${page}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  // User Management
  async getAllUsers(page = 1, limit = 10): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/api/admin/users?page=${page}&limit=${limit}`, {
        headers: this.getAuthHeaders(),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  // Booking Management
  async getAllBookings(page = 1, limit = 10, filters?: any): Promise<any> {
    try {
      let url = `${this.baseUrl}/api/admin/bookings?page=${page}&limit=${limit}`;
      
      if (filters?.status) {
        url += `&status=${filters.status}`;
      }
      if (filters?.eventId) {
        url += `&eventId=${filters.eventId}`;
      }
      
      const response = await fetch(url, {
        headers: this.getAuthHeaders(),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  }
}

export const adminService = AdminService.getInstance(); 