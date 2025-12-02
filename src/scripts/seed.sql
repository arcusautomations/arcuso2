-- Arcus Automations Seed Data
-- Run this script AFTER migrate.sql and rls-policies.sql
-- This adds sample resources for development/demo purposes

-- ============================================
-- SAMPLE COURSES
-- ============================================
INSERT INTO resources (title, description, type, category, duration_minutes, difficulty, is_premium, price_cents, order_index, is_published)
VALUES
  (
    'Introduction to AI Fundamentals',
    'Learn the core concepts of artificial intelligence, including machine learning basics, neural networks, and practical applications. Perfect for beginners starting their AI journey.',
    'course',
    'AI Basics',
    120,
    'beginner',
    false,
    NULL,
    1,
    true
  ),
  (
    'Building Your First Automation',
    'A hands-on course teaching you how to create powerful automations using no-code tools. From simple workflows to complex multi-step processes.',
    'course',
    'Automation',
    90,
    'beginner',
    false,
    NULL,
    2,
    true
  ),
  (
    'Advanced Prompt Engineering',
    'Master the art of crafting effective prompts for large language models. Learn techniques for getting better results from ChatGPT, Claude, and other AI assistants.',
    'course',
    'AI Basics',
    180,
    'intermediate',
    true,
    4999,
    3,
    true
  ),
  (
    'Machine Learning for Business',
    'Understand how to apply machine learning to solve real business problems. Includes case studies from e-commerce, finance, and healthcare.',
    'course',
    'Machine Learning',
    240,
    'intermediate',
    true,
    7999,
    4,
    true
  ),
  (
    'AI-Powered Customer Service',
    'Build intelligent chatbots and automated support systems. Learn to integrate AI into your customer service workflow for 24/7 support.',
    'course',
    'Automation',
    150,
    'intermediate',
    true,
    5999,
    5,
    true
  ),
  (
    'Deep Learning Masterclass',
    'Advanced course covering deep neural networks, CNNs, RNNs, and transformers. Hands-on projects with TensorFlow and PyTorch.',
    'course',
    'Machine Learning',
    360,
    'advanced',
    true,
    14999,
    6,
    true
  )
ON CONFLICT DO NOTHING;

-- ============================================
-- SAMPLE GUIDES
-- ============================================
INSERT INTO resources (title, description, type, category, duration_minutes, difficulty, is_premium, order_index, is_published)
VALUES
  (
    'Getting Started with OpenAI API',
    'Step-by-step guide to setting up and using the OpenAI API in your applications. Includes code examples in Python and JavaScript.',
    'guide',
    'AI Basics',
    30,
    'beginner',
    false,
    10,
    true
  ),
  (
    'Zapier Automation Cookbook',
    'A collection of 50+ ready-to-use Zapier automation recipes for common business workflows.',
    'guide',
    'Automation',
    45,
    'beginner',
    false,
    11,
    true
  ),
  (
    'AI Ethics and Responsible Use',
    'Essential reading on the ethical considerations of AI development and deployment. Covers bias, privacy, and transparency.',
    'guide',
    'AI Basics',
    60,
    'beginner',
    false,
    12,
    true
  ),
  (
    'Building RAG Applications',
    'Learn how to build Retrieval-Augmented Generation systems for accurate, context-aware AI responses.',
    'guide',
    'Machine Learning',
    90,
    'advanced',
    true,
    13,
    true
  )
ON CONFLICT DO NOTHING;

-- ============================================
-- SAMPLE TEMPLATES
-- ============================================
INSERT INTO resources (title, description, type, category, difficulty, is_premium, order_index, is_published)
VALUES
  (
    'Email Marketing Automation Template',
    'Pre-built automation flow for email marketing campaigns. Includes welcome sequences, follow-ups, and re-engagement campaigns.',
    'template',
    'Automation',
    'beginner',
    false,
    20,
    true
  ),
  (
    'AI Chatbot Starter Kit',
    'Complete template for building a customer service chatbot using modern AI tools. Includes conversation flows and integration guides.',
    'template',
    'Automation',
    'intermediate',
    true,
    21,
    true
  ),
  (
    'Data Pipeline Template',
    'Ready-to-use data pipeline for collecting, processing, and analyzing data from multiple sources.',
    'template',
    'Data Engineering',
    'intermediate',
    true,
    22,
    true
  )
ON CONFLICT DO NOTHING;

-- ============================================
-- SAMPLE TOOLS
-- ============================================
INSERT INTO resources (title, description, type, category, difficulty, is_premium, order_index, is_published)
VALUES
  (
    'Prompt Library',
    'Curated collection of 100+ effective prompts for various AI models and use cases.',
    'tool',
    'AI Basics',
    'beginner',
    false,
    30,
    true
  ),
  (
    'Automation ROI Calculator',
    'Calculate the potential return on investment for your automation projects. Includes time savings and cost analysis.',
    'tool',
    'Automation',
    'beginner',
    false,
    31,
    true
  ),
  (
    'AI Model Comparison Tool',
    'Interactive tool to compare different AI models based on performance, cost, and capabilities.',
    'tool',
    'AI Basics',
    'intermediate',
    true,
    32,
    true
  )
ON CONFLICT DO NOTHING;

-- Verify the seed data
SELECT type, COUNT(*) as count FROM resources GROUP BY type ORDER BY type;


