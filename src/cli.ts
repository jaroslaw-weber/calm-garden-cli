import { prompt } from 'enquirer';
import chalk from 'chalk';

export async function setupConfig() {
  console.log(chalk.green('\n🌿 Welcome to CLI Calm Garden 🌿\n'));

  const response = await prompt<{action: string}>({
    type: 'select',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      { name: 'garden', message: '🏡 Show Garden' },
      { name: 'progress', message: '📊 Show Progress' },
      { name: 'boxBreathing', message: '🧘 Start Box Breathing' },
      { name: 'physiologicalSigh', message: '😮‍💨 Start Physiological Sigh' },
      { name: 'shop', message: '🛒 Open Shop' },
      { name: 'reset', message: '🔄 Reset Data' },
      { name: 'exit', message: '👋 Exit' }
    ]
  });

  return response;
}