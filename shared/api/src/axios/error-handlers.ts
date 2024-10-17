import { AxiosError } from 'axios';

interface ApiError {
  message: string;
  statusCode?: number;
  data?: { data?: unknown; message: string; success: boolean };
}

// Helper Function tohandler different error types
export const handleError = (error: AxiosError): ApiError => {
  let apiError: ApiError = { message: 'An unknown error occurred' };

  if (error.response) {
    const statusCode = error.response.status;
    const responseData = error.response.data as {
      data: unknown;
      message: string;
      success: boolean;
    };

    // Log or handle specific status codes
    switch (statusCode) {
      case 400:
        apiError = {
          message: responseData.message || 'Bad Request',
          statusCode,
          data: responseData,
        };
        break;
      case 401:
        apiError = {
          message: responseData.message || 'Unauthorized - Please login again',
          statusCode,
          data: responseData,
        };
        // Optional: Trigger logout or redirection to login
        break;
      case 403:
        apiError = {
          message:
            responseData.message ||
            'Forbidden - You do not have permission to access this resource',
          statusCode,
          data: responseData,
        };
        break;
      case 404:
        apiError = {
          message: responseData.message || 'Resource not found',
          statusCode,
          data: responseData,
        };
        break;
      case 500:
        apiError = {
          message: 'Internal Server Error - Please try again later',
          statusCode,
          data: responseData,
        };
        break;
      case 503:
        apiError = {
          message:
            responseData.message ||
            'Service Unavailable - The server is temporarily down',
          statusCode,
          data: responseData,
        };
        break;
      default:
        apiError = {
          message:
            responseData.message || `Unexpected error occurred: ${statusCode}`,
          statusCode,
          data: responseData,
        };
        break;
    }
  } else if (error.request) {
    if (error.code === 'ECONNABORTED') {
      apiError.message = 'Request timed out - Please try again later';
    } else
      apiError.message = 'Network Error - Please check your network connection';
  } else {
    // Something happened while setting up the request
    apiError.message = `Request setup error: ${error.message}`;
  }
  return apiError;
};
