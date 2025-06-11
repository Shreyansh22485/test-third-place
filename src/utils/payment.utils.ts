// src/utils/payment.utils.ts

/**
 * Payment utility functions for frontend
 */

export interface PaymentEnvironment {
  isProduction: boolean;
  keyId: string | null;
  minAmount: number; // in rupees
  currency: string;
}

export class PaymentUtils {
  private static getEnvironment(): PaymentEnvironment {
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    
    return {
      isProduction: keyId?.startsWith('rzp_live_') || false,
      keyId: keyId || null,
      minAmount: 1, // ₹1 minimum
      currency: 'INR'
    };
  }

  public static isProductionMode(): boolean {
    return this.getEnvironment().isProduction;
  }

  public static getKeyId(): string | null {
    return this.getEnvironment().keyId;
  }

  public static validateAmount(amount: number): { valid: boolean; error?: string } {
    const env = this.getEnvironment();
    
    if (amount < env.minAmount) {
      return {
        valid: false,
        error: `Minimum amount is ₹${env.minAmount}`
      };
    }

    if (amount > 100000) { // ₹1 lakh max for safety
      return {
        valid: false,
        error: 'Maximum amount is ₹1,00,000'
      };
    }

    return { valid: true };
  }

  public static formatAmount(amount: number): string {
    const env = this.getEnvironment();
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: env.currency
    }).format(amount);
  }

  public static logPaymentActivity(activity: string, data: any): void {
    const env = this.getEnvironment();
    const timestamp = new Date().toISOString();
    
    const logData = {
      timestamp,
      environment: env.isProduction ? 'PRODUCTION' : 'TEST',
      activity,
      ...data
    };

    if (env.isProduction) {
      console.log(`🚨 PRODUCTION PAYMENT: ${activity}`, logData);
    } else {
      console.log(`🧪 TEST PAYMENT: ${activity}`, logData);
    }
  }

  /**
   * Get user-friendly payment mode text
   */
  public static getPaymentModeText(): string {
    return this.isProductionMode() 
      ? '💳 Live Payment Mode - Real money will be charged'
      : '🧪 Test Payment Mode - No real money will be charged';
  }

  /**
   * Get CSS class for payment mode indicator
   */
  public static getPaymentModeClass(): string {
    return this.isProductionMode() 
      ? 'text-red-600 font-semibold'
      : 'text-blue-600 font-normal';
  }

  /**
   * Convert rupees to paise (Razorpay format)
   */
  public static rupeesToPaise(rupees: number): number {
    return Math.max(Math.round(rupees * 100), 100); // Minimum 100 paise
  }

  /**
   * Convert paise to rupees
   */
  public static paiseToRupees(paise: number): number {
    return paise / 100;
  }
}

export default PaymentUtils;
