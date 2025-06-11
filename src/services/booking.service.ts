import { api } from '@/lib/api';
import { BackendEvent } from './events.service';

interface BookedEvent {
  _id: string;
  userId: string;
  eventId: BackendEvent;
  numberOfSeats: number;
  totalAmount: number;
  bookingStatus: 'pending_payment' | 'confirmed' | 'cancelled' | 'completed';
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
   * Get confirmed bookings only (for invites)
   */
  async getConfirmedBookings(): Promise<BookedEvent[]> {
    return this.getUserBookings(1, 50, 'confirmed');
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
