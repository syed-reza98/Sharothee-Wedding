// Quick test to check the guests API response structure
async function testGuestsAPI() {
  try {
    const response = await fetch('http://localhost:3000/api/guests', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log('Status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Response structure:', {
        hasGuests: 'guests' in data,
        hasPagination: 'pagination' in data,
        guestsType: Array.isArray(data.guests) ? 'array' : typeof data.guests,
        guestsLength: data.guests?.length || 0,
        firstGuest: data.guests?.[0] || null
      });
    } else {
      const errorText = await response.text();
      console.log('Error response:', errorText);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

// Run the test
testGuestsAPI();
