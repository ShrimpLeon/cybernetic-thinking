#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const pkg = require(path.join(__dirname, '..', 'package.json'));
const skillName = pkg.name;
const skillDir = path.join(__dirname, '..');

const agents = [
  {
    name: 'Kilo',
    paths: [
      path.join(os.homedir(), '.config', 'kilo', 'skills'),
      path.join(process.cwd(), '.kilo', 'agent')
    ]
  },
  {
    name: 'Claude Code',
    paths: [
      path.join(os.homedir(), '.claude', 'plugins', 'custom-skills'),
      path.join(process.cwd(), '.claude')
    ]
  },
  {
    name: 'Aider',
    paths: [
      path.join(os.homedir(), '.aider', 'skills'),
      path.join(process.cwd(), '.aider', 'skills')
    ]
  },
  {
    name: 'Cursor',
    paths: [
      path.join(process.cwd(), '.cursor', 'rules')
    ]
  },
  {
    name: 'OpenAI Codex',
    paths: [
      path.join(os.homedir(), '.codex', 'skills')
    ]
  },
  {
    name: 'GitHub Copilot',
    paths: [
      path.join(os.homedir(), '.copilot', 'skills')
    ]
  },
  {
    name: 'Windsurf',
    paths: [
      path.join(os.homedir(), '.windsurf', 'skills')
    ]
  },
  {
    name: 'Zed',
    paths: [
      path.join(os.homedir(), '.zed', 'skills')
    ]
  }
];

function dirExists(dir) {
  try {
    return fs.statSync(dir).isDirectory();
  } catch {
    return false;
  }
}

function linkSkill(targetDir, agentName) {
  const dest = path.join(targetDir, skillName);
  if (fs.existsSync(dest)) {
    console.log(`[SKIP] ${agentName}: ${dest} already exists`);
    return;
  }
  try {
    fs.mkdirSync(targetDir, { recursive: true });
    fs.symlinkSync(skillDir, dest, 'junction');
    console.log(`[OK] ${agentName}: linked to ${dest}`);
  } catch (err) {
    console.log(`[FAIL] ${agentName}: could not link to ${dest} (${err.message})`);
    console.log(`       Try copying manually: cp -r ${skillDir} ${dest}`);
  }
}

function main() {
  const isGlobal = process.argv.includes('--global') || process.argv.includes('-g');
  const force = process.argv.includes('--force');

  console.log(`Installing ${skillName}...`);
  console.log(`Skill directory: ${skillDir}`);
  console.log(`Mode: ${isGlobal ? 'global' : 'project-local'}`);
  console.log('');

  let installed = 0;
  let skipped = 0;
  let failed = 0;

  for (const agent of agents) {
    const targetDirs = isGlobal
      ? agent.paths.filter(p => p.includes(os.homedir()))
      : agent.paths;

    for (const targetDir of targetDirs) {
      if (!dirExists(targetDir) && !isGlobal) {
        continue;
      }
      if (!dirExists(targetDir) && isGlobal) {
        try {
          fs.mkdirSync(targetDir, { recursive: true });
        } catch {
          console.log(`[SKIP] ${agent.name}: cannot create ${targetDir}`);
          skipped++;
          continue;
        }
      }

      if (force && fs.existsSync(path.join(targetDir, skillName))) {
        try {
          fs.rmSync(path.join(targetDir, skillName), { recursive: true });
        } catch {
          console.log(`[FAIL] ${agent.name}: could not remove existing ${targetDir}/${skillName}`);
          failed++;
          continue;
        }
      }

      linkSkill(targetDir, agent.name);
      installed++;
    }
  }

  console.log('');
  console.log(`Done. Installed: ${installed}, Skipped: ${skipped}, Failed: ${failed}`);

  if (installed > 0) {
    console.log('');
    console.log('Verify the installation by running:');
    console.log('  pwsh init.ps1');
  }
}

main();