/**
 * Utility to upload files to Supabase Storage bucket 'store-logos' via REST API.
 * Falls back to returning base64 if Supabase credentials are not configured.
 */
export async function uploadStoreLogo(file: File): Promise<string> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('seu-projeto')) {
    console.warn('Supabase credentials not set or placeholder. Falling back to base64 URL.');
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  // Sanitize file name
  const fileExt = file.name.split('.').pop() || 'png';
  const fileName = `logo-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  
  // REST Endpoint for Supabase Storage Upload
  const uploadUrl = `${supabaseUrl}/storage/v1/object/store-logos/${fileName}`;

  try {
    const res = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'apikey': supabaseAnonKey,
        'Content-Type': file.type,
      },
      body: file,
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Upload failed: ${res.statusText} - ${errText}`);
    }

    // Return the public URL for the uploaded asset
    return `${supabaseUrl}/storage/v1/object/public/store-logos/${fileName}`;
  } catch (error) {
    console.error('Error uploading to Supabase Storage:', error);
    // Fall back to base64 if there is an upload error
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.readAsDataURL(file);
    });
  }
}
