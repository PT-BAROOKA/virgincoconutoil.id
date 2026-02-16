import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { decode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const BLOG_TOPICS = [
  "manfaat virgin coconut oil (VCO) untuk kesehatan jantung dan pembuluh darah",
  "cara memilih VCO berkualitas dan membedakan VCO asli dari palsu",
  "manfaat VCO untuk perawatan kulit wajah: anti-aging, pelembab alami, dan mengatasi jerawat",
  "VCO untuk kesehatan rambut: cara menggunakan dan manfaatnya",
  "manfaat VCO untuk meningkatkan sistem imun tubuh secara alami",
  "VCO untuk program diet sehat dan menurunkan berat badan",
  "cara membuat VCO murni di rumah dengan metode cold-pressed",
  "manfaat asam laurat dalam VCO untuk kesehatan tubuh",
  "VCO untuk bayi dan anak: manfaat dan cara penggunaan yang aman",
  "perbandingan VCO dengan minyak kelapa biasa dari segi nutrisi dan manfaat",
  "VCO untuk penderita diabetes: apakah aman dan bermanfaat?",
  "resep masakan sehat menggunakan VCO sebagai pengganti minyak goreng",
  "manfaat VCO untuk kesehatan gigi dan mulut (oil pulling)",
  "VCO sebagai bahan alami untuk skincare dan kecantikan",
  "tips menyimpan VCO yang benar agar kualitasnya tetap terjaga",
  "manfaat VCO untuk ibu hamil dan menyusui",
  "VCO untuk mengatasi masalah pencernaan dan kesehatan usus",
  "perbedaan VCO organik dan non-organik: mana yang lebih baik?",
  "manfaat VCO untuk hewan peliharaan: kucing dan anjing",
  "tren penggunaan VCO di dunia kecantikan dan wellness internasional",
];

const IMAGE_STYLES = [
  "a professional product photo of virgin coconut oil bottles on a tropical wooden table with coconut leaves, soft natural lighting, high quality",
  "a beautiful flat lay of coconut oil in a glass jar surrounded by fresh coconuts, tropical flowers, and green leaves on a marble surface, soft studio lighting",
  "a close-up of golden virgin coconut oil being poured from a bottle, with coconut halves and palm leaves in the background, warm lighting",
  "a lifestyle photo of virgin coconut oil bottles arranged with fresh coconuts on a beach setting, golden hour lighting, tropical vibes",
  "a minimalist product shot of coconut oil in a clear bottle with coconut slices and tropical greenery, clean white background, elegant",
  "a warm kitchen scene with virgin coconut oil being used for cooking, fresh vegetables and coconuts nearby, cozy natural lighting",
  "a spa and wellness setting with coconut oil, tropical flowers, bamboo, and candles, relaxing atmosphere, soft warm tones",
  "a birds-eye view of coconut oil surrounded by fresh coconuts, tropical fruits, and green leaves on a rustic wooden table, vibrant colors",
];

async function generateContent(topic: string) {
  const systemPrompt = `Kamu adalah penulis konten ahli tentang Virgin Coconut Oil (VCO) di Indonesia.
Tulis artikel dalam Bahasa Indonesia yang informatif dan SEO-friendly tentang topik yang diberikan.

ATURAN FORMAT HTML:
- Setiap paragraf HARUS dibungkus tag <p></p>
- Setiap <p> berisi 2-4 kalimat maksimum
- Gunakan <h2> untuk section utama, <h3> untuk sub-section
- Gunakan <strong> dan <em> (BUKAN markdown ** atau *)
- JANGAN gunakan <br> untuk paragraf — gunakan <p> terpisah
- Tulis minimal 800 kata

Kembalikan HANYA JSON object (tanpa markdown code block):
{
  "title": "Judul artikel yang menarik dan SEO-friendly",
  "metaDescription": "Deskripsi meta 150-160 karakter",
  "excerpt": "Ringkasan 2-3 kalimat",
  "content": "Konten HTML lengkap artikel",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "tags": ["tag1", "tag2"],
  "slug": "url-friendly-slug-tanpa-spasi",
  "category": "Tips Kesehatan"
}`;

  const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${LOVABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/gemini-3-flash-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Tulis artikel lengkap tentang: ${topic}` }
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('AI Gateway error:', response.status, errorText);
    throw new Error(`AI Gateway error: ${response.status}`);
  }

  return response.json();
}

async function generateBlogImage(topic: string): Promise<string | null> {
  try {
    const style = IMAGE_STYLES[Math.floor(Math.random() * IMAGE_STYLES.length)];
    const prompt = `${style}, related to ${topic}, ultra high resolution, 16:9 aspect ratio`;

    console.log('Generating blog image with prompt:', prompt.substring(0, 100));

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image',
        messages: [
          { role: 'user', content: prompt }
        ],
        modalities: ['image', 'text'],
      }),
    });

    if (!response.ok) {
      console.error('Image generation error:', response.status);
      return null;
    }

    const data = await response.json();
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageUrl) {
      console.log('No image generated');
      return null;
    }

    // Extract base64 data and upload to storage
    const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, '');
    const imageBytes = decode(base64Data);
    const fileName = `blog-${Date.now()}-${Math.random().toString(36).substring(7)}.png`;

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(fileName, imageBytes, {
        contentType: 'image/png',
        upsert: false,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName);

    console.log('Image uploaded:', publicUrlData.publicUrl);
    return publicUrlData.publicUrl;
  } catch (err) {
    console.error('Image generation failed:', err);
    return null;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY is not configured');
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) throw new Error('Supabase credentials not configured');

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Check if we already published today
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const { data: existingPost } = await supabase
      .from('blog_posts')
      .select('id, published_at')
      .gte('published_at', oneDayAgo.toISOString())
      .eq('source', 'ai')
      .order('published_at', { ascending: false })
      .limit(1)
      .single();

    if (existingPost) {
      console.log('Blog post already published today, skipping');
      return new Response(
        JSON.stringify({ message: 'Blog post already published today', skipped: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Pick random topic
    const topic = BLOG_TOPICS[Math.floor(Math.random() * BLOG_TOPICS.length)];
    console.log('Generating blog about:', topic);

    // Generate content and image in parallel
    const [contentData, featuredImageUrl] = await Promise.all([
      generateContent(topic),
      generateBlogImage(topic),
    ]);

    let rawContent = contentData.choices[0].message.content.trim();

    // Clean up potential markdown wrapping
    rawContent = rawContent.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
    rawContent = rawContent
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, (char: string) => {
        if (char === '\n' || char === '\t') return char;
        return '';
      });

    console.log('Parsing AI response...');
    const blogData = JSON.parse(rawContent);

    // Calculate word count & reading time
    const plainText = blogData.content.replace(/<[^>]+>/g, '');
    const wordCount = plainText.split(/\s+/).filter(Boolean).length;
    const readingTime = Math.ceil(wordCount / 200);

    // Insert blog post
    const { data: blogPost, error } = await supabase
      .from('blog_posts')
      .insert({
        title: blogData.title,
        slug: `${blogData.slug}-${Date.now()}`,
        content_html: blogData.content,
        excerpt: blogData.excerpt,
        meta_title: blogData.title,
        meta_description: blogData.metaDescription,
        keywords: blogData.keywords,
        tags: blogData.tags,
        category: blogData.category || 'Edukasi',
        word_count: wordCount,
        reading_time_minutes: readingTime,
        featured_image_url: featuredImageUrl,
        og_image_url: featuredImageUrl,
        status: 'published',
        source: 'ai',
        published_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Database insert error:', error);
      throw error;
    }

    console.log('Blog post published:', blogPost.title, 'with image:', !!featuredImageUrl);

    return new Response(
      JSON.stringify({ success: true, post: { id: blogPost.id, title: blogPost.title, slug: blogPost.slug, hasImage: !!featuredImageUrl } }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Auto-publish error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
