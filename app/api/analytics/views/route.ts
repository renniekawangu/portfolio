import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

const VIEWS_FILE = path.join(process.cwd(), 'data', 'views.json');

interface ViewRecord {
  slug: string;
  timestamp: string;
  userAgent?: string;
}

interface ViewStats {
  [slug: string]: number;
}

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Get all view records
function getViewRecords(): ViewRecord[] {
  ensureDataDir();
  if (!fs.existsSync(VIEWS_FILE)) {
    return [];
  }
  try {
    const data = fs.readFileSync(VIEWS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Save view records
function saveViewRecords(records: ViewRecord[]) {
  ensureDataDir();
  fs.writeFileSync(VIEWS_FILE, JSON.stringify(records, null, 2));
}

// Get view counts per slug
function getViewStats(): ViewStats {
  const records = getViewRecords();
  const stats: ViewStats = {};
  
  records.forEach(record => {
    stats[record.slug] = (stats[record.slug] || 0) + 1;
  });
  
  return stats;
}

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug');
  
  if (slug) {
    // Get views for specific post
    const stats = getViewStats();
    return NextResponse.json({ 
      slug, 
      views: stats[slug] || 0,
      timestamp: new Date().toISOString()
    });
  }
  
  // Get all stats
  const stats = getViewStats();
  return NextResponse.json(stats);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug } = body;
    
    if (!slug) {
      return NextResponse.json(
        { error: 'slug is required' },
        { status: 400 }
      );
    }
    
    // Add new view record
    const records = getViewRecords();
    const newRecord: ViewRecord = {
      slug,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || undefined,
    };
    
    records.push(newRecord);
    saveViewRecords(records);
    
    // Return updated count
    const stats = getViewStats();
    return NextResponse.json({ 
      slug, 
      views: stats[slug],
      message: 'View recorded'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to record view' },
      { status: 500 }
    );
  }
}
