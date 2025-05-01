const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchInstance = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const fullUrl = `${API_BASE_URL}${url}`; // API_BASE_URL과 상대 경로 결합

  const response = await fetch(fullUrl, {
    // API_BASE_URL을 요청 URL에 추가
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'API 요청 실패');
  }

  const data = await response.json();
  return data;
};
