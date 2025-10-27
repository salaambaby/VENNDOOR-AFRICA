export function logout() {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('venndoor-auth');
      localStorage.removeItem('venndoor-user');
      window.location.href = '/login';
    }
  } catch {
    if (typeof window !== 'undefined') window.location.href = '/login';
  }
}










