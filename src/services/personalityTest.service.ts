// TypeForm integration service for frontend
import { api } from '@/lib/api';

export interface PersonalityTestStatus {
  personalityTestCompleted: boolean;
  testData?: {
    completedAt: string;
    personalityType?: string;
    testScore?: number;
    verified: boolean;
  };
}

export interface PersonalityTestSubmission {
  responses: any[]; // Typeform responses
  typeformResponseId?: string;
  testScore?: number;
  personalityType?: string;
}

class PersonalityTestService {
  private static instance: PersonalityTestService;

  static getInstance(): PersonalityTestService {
    if (!PersonalityTestService.instance) {
      PersonalityTestService.instance = new PersonalityTestService();
    }
    return PersonalityTestService.instance;
  }

  /**
   * Get the current user's personality test status
   */
  async getTestStatus(): Promise<PersonalityTestStatus> {
    try {
      const response = await api.get('/personality-test/status');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching personality test status:', error);
      throw error;
    }
  }

  /**
   * Submit personality test results manually (backup method)
   * Note: This is usually not needed as the webhook handles it automatically
   */
  async submitTest(submission: PersonalityTestSubmission): Promise<any> {
    try {
      const response = await api.post('/personality-test/submit', submission);
      return response.data;
    } catch (error) {
      console.error('Error submitting personality test:', error);
      throw error;
    }
  }

  /**
   * Generate the Typeform URL with pre-filled user data
   */
  generateTypeformUrl(user: {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phoneNumber: string;
  }): string {
    const baseUrl = 'https://form.typeform.com/to/XiBDE8Js';
    const params = new URLSearchParams({
      'typeform-source': 'www.google.com',
      'first_name': user.firstName,
      'last_name': user.lastName,
      'email': user.email || '',
      'phone_number': user.phoneNumber,
      'user_id': user.id
    });

    return `${baseUrl}?${params.toString()}`;
  }

  /**
   * Listen for test completion (can be used for real-time updates)
   * This could be enhanced with WebSocket or polling
   */
  async checkForTestCompletion(userId: string): Promise<boolean> {
    try {
      const status = await this.getTestStatus();
      return status.personalityTestCompleted;
    } catch (error) {
      console.error('Error checking test completion:', error);
      return false;
    }
  }
}

export const personalityTestService = PersonalityTestService.getInstance();
