import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { decode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const OPENAI_API_KEY = Deno.env.get('OPEN_AI_API_KEY') || Deno.env.get('OPENAI_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const BLOG_TOPICS = [
  // Kesehatan
  "manfaat virgin coconut oil (VCO) untuk kesehatan jantung dan pembuluh darah",
  "manfaat VCO untuk meningkatkan sistem imun tubuh secara alami",
  "manfaat asam laurat dalam VCO untuk kesehatan tubuh",
  "VCO untuk penderita diabetes: apakah aman dan bermanfaat?",
  "VCO untuk mengatasi masalah pencernaan dan kesehatan usus",
  "manfaat VCO untuk ibu hamil dan menyusui",
  "VCO untuk bayi dan anak: manfaat dan cara penggunaan yang aman",
  "manfaat VCO untuk kesehatan gigi dan mulut (oil pulling)",
  "VCO untuk program diet sehat dan menurunkan berat badan",
  "manfaat VCO untuk menurunkan kolesterol dan menjaga tekanan darah",
  "VCO sebagai sumber energi cepat: manfaat MCT untuk tubuh",
  "manfaat VCO untuk detoksifikasi tubuh secara alami",
  // Kecantikan
  "manfaat VCO untuk perawatan kulit wajah: anti-aging, pelembab alami, dan mengatasi jerawat",
  "VCO untuk kesehatan rambut: cara menggunakan dan manfaatnya",
  "VCO sebagai bahan alami untuk skincare dan kecantikan sehari-hari",
  "cara menggunakan VCO sebagai makeup remover dan pembersih wajah alami",
  "manfaat VCO untuk mengatasi kulit kering, eksim, dan dermatitis",
  "VCO untuk perawatan kuku dan kutikula yang sehat dan kuat",
  "manfaat VCO sebagai body lotion alami untuk kulit lembab sepanjang hari",
  "VCO untuk mengatasi stretch mark dan bekas luka secara alami",
  // Masakan
  "resep masakan sehat menggunakan VCO sebagai pengganti minyak goreng",
  "VCO untuk menggoreng: mengapa lebih sehat dari minyak goreng biasa?",
  "resep smoothie dan minuman sehat dengan campuran VCO",
  "tips memasak dengan VCO: suhu ideal dan cara agar masakan lebih sehat",
  "resep salad dressing dan saus sehat berbahan dasar VCO",
  "VCO dalam masakan tradisional Indonesia: dari rendang hingga kue",
  "resep sarapan sehat dengan VCO: granola, oatmeal, dan roti panggang",
  "manfaat mengganti mentega dengan VCO dalam resep kue dan roti",
];


async function generateContent(topic: string) {
  const systemPrompt = `Kamu adalah penulis konten ahli tentang Virgin Coconut Oil (VCO) dari brand Barooka di Indonesia.
Tulis artikel dalam Bahasa Indonesia yang informatif dan SEO-friendly tentang topik yang diberikan.

FOKUS KONTEN (pilih salah satu sesuai topik):
- KESEHATAN: manfaat VCO untuk kesehatan tubuh, imunitas, pencernaan, jantung, dll.
- KECANTIKAN: manfaat VCO untuk perawatan kulit, rambut, skincare alami, dll.
- MASAKAN: resep dan tips memasak sehat menggunakan VCO sebagai bahan utama.

Pastikan artikel selalu menghubungkan manfaat dengan penggunaan VCO secara praktis.

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
  "category": "Kesehatan | Kecantikan | Masakan",
  "imagePrompt": "Tulis prompt DALL-E 3 dalam bahasa Inggris untuk gambar featured blog. BRAND STYLE GUIDE (WAJIB KONSISTEN): (1) Gaya: lifestyle photography profesional, clean dan bright. (2) Warna: warm golden tones, cream, soft green — palette kelapa tropis. (3) Pencahayaan: natural soft light dari samping, golden hour feel. (4) Background: bersih dan minimalis — marble putih, kayu natural, linen, atau dapur modern. (5) Komposisi: rule of thirds, shallow depth of field dengan bokeh lembut. SUBJEK WAJIB: PEREMPUAN BERHIJAB (Muslim women wearing hijab) — bisa ibu berhijab dengan anak atau keluarga. Contoh: kesehatan → perempuan berhijab berolahraga pagi; kecantikan → close-up perempuan berhijab dengan kulit glowing merawat wajah; masakan → ibu berhijab memasak di dapur modern. LARANGAN KETAT: (1) JANGAN ada teks, tulisan, label, watermark. (2) JANGAN gambar hewan. (3) JANGAN gambar produk dengan label/brand."
}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Tulis artikel lengkap tentang: ${topic}` },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('OpenAI Chat error:', response.status, errorText);
    throw new Error(`OpenAI Chat error: ${response.status}`);
  }

  return response.json();
}

async function generateBlogImage(imagePrompt: string): Promise<string | null> {
  try {
    const prompt = `${imagePrompt}. MANDATORY STYLE: professional lifestyle photography, warm golden color palette with cream and soft green tones, natural soft side lighting with golden hour feel, clean minimalist background, shallow depth of field with soft bokeh, 16:9 landscape, ultra high quality. NO text, NO labels, NO words, NO watermarks anywhere. Must feature Muslim women wearing hijab as subjects.`;

    console.log('Generating blog image with DALL-E 3:', prompt.substring(0, 100));

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt,
        n: 1,
        size: '1792x1024',
        response_format: 'b64_json',
      }),
    });

    if (!response.ok) {
      console.error('DALL-E 3 error:', response.status);
      return null;
    }

    const data = await response.json();
    const b64Data = data.data?.[0]?.b64_json;

    if (!b64Data) {
      console.log('No image generated');
      return null;
    }

    // Decode base64 and upload to storage
    const imageBytes = decode(b64Data);
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
    if (!OPENAI_API_KEY) throw new Error('OPENAI_API_KEY is not configured');
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) throw new Error('Supabase credentials not configured');

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Safety check: skip if already published in last 2 days (prevents double-posting from cron)
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const { data: recentPost } = await supabase
      .from('blog_posts')
      .select('id, published_at')
      .gte('published_at', twoDaysAgo.toISOString())
      .eq('source', 'ai')
      .order('published_at', { ascending: false })
      .limit(1)
      .single();

    // Allow manual override via request body { "force": true }
    let forcePublish = false;
    try {
      const body = await req.json();
      forcePublish = body?.force === true;
    } catch { /* no body or invalid JSON, that's fine */ }

    if (recentPost && !forcePublish) {
      console.log('Blog post already published in last 2 days, skipping (use { "force": true } to override)');
      return new Response(
        JSON.stringify({ message: 'Blog post already published recently', skipped: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Smart topic rotation: pick topic not yet used, or least recently used
    const { data: usedSlugs } = await supabase
      .from('blog_posts')
      .select('slug')
      .eq('source', 'ai')
      .order('published_at', { ascending: false })
      .limit(BLOG_TOPICS.length);

    const usedKeywords = (usedSlugs || []).map((p: { slug: string }) => p.slug.toLowerCase());
    let topic = BLOG_TOPICS.find(t => {
      const topicKey = t.toLowerCase().substring(0, 30);
      return !usedKeywords.some(slug => slug.includes(topicKey.split(' ').slice(0, 3).join('-')));
    });
    // Fallback: if all topics used, pick random
    if (!topic) {
      topic = BLOG_TOPICS[Math.floor(Math.random() * BLOG_TOPICS.length)];
    }
    console.log('Generating blog about:', topic);

    // Step 1: Generate article content (includes custom imagePrompt)
    const contentData = await generateContent(topic);

    let rawContent = contentData.choices[0].message.content.trim();
    rawContent = rawContent.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
    rawContent = rawContent
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, (char: string) => {
        if (char === '\n' || char === '\t') return char;
        return '';
      });

    console.log('Parsing AI response...');
    const blogData = JSON.parse(rawContent);

    // Step 2: Generate image using the article-specific prompt from GPT-4o
    const featuredImageUrl = blogData.imagePrompt
      ? await generateBlogImage(blogData.imagePrompt)
      : null;
    const slug = `${blogData.slug}-${Date.now()}`;

    // Calculate word count & reading time
    const plainText = blogData.content.replace(/<[^>]+>/g, '');
    const wordCount = plainText.split(/\s+/).filter(Boolean).length;
    const readingTime = Math.ceil(wordCount / 200);

    // Insert blog post
    const { data: blogPost, error } = await supabase
      .from('blog_posts')
      .insert({
        title: blogData.title,
        slug,
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
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});