import { api } from '@/lib/api';
import { BackendEvent } from './events.service';

interface BookedEvent {
  _id: string;
  userId: string;
  eventId: BackendEvent;
  numberOfSeats: number;
  totalAmount: number;
  bookingStatus: 'pending_payment' | 'waitlist' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

interface BookingResponse {
  success: boolean;
  data: {
    bookings: BookedEvent[];
    totalPages: number;
    currentPage: number;
    total: number;
  };
}

class BookingService {  /**
   * Get user's booked events (for invites section)
   */
  async getUserBookings(page = 1, limit = 20, status?: string): Promise<BookedEvent[]> {
    try {
      let url = `/booking/user?page=${page}&limit=${limit}`;
      if (status) {
        url += `&status=${status}`;
      }
      
      const response = await api.get(url);
      
      if (response.data.success) {
        return response.data.data.bookings || [];
      } else {
        throw new Error(response.data.error || 'Failed to fetch bookings');
      }
    } catch (error: any) {
      console.error('Error fetching user bookings:', error);
      throw new Error(error.response?.data?.error || error.message || 'Failed to fetch bookings');
    }
  }
  /**
   * Get paid bookings (confirmed + waitlisted) for invites page
   */
  async getConfirmedBookings(): Promise<BookedEvent[]> {
    try {
      // Get all bookings first
      const allBookings = await this.getUserBookings(1, 50);
      
      // Filter for paid bookings (confirmed, waitlist, completed)
      return allBookings.filter(booking => 
        booking.bookingStatus === 'confirmed' || 
        booking.bookingStatus === 'waitlist' || 
        booking.bookingStatus === 'completed'
      );
    } catch (error: any) {
      console.error('Error fetching paid bookings:', error);
      throw new Error(error.message || 'Failed to fetch paid bookings');
    }
  }
  /**
   * Get booking details by ID
   */
  async getBookingById(bookingId: string): Promise<BookedEvent> {
    try {
      const response = await api.get(`/booking/${bookingId}`);
      
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.error || 'Booking not found');
      }
    } catch (error: any) {
      console.error('Error fetching booking:', error);
      throw new Error(error.response?.data?.error || error.message || 'Failed to fetch booking');
    }
  }
}

export const bookingService = new BookingService();
export type { BookedEvent };
