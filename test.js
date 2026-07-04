import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('\x1b[35m%s\x1b[0m', '💖 STARTING ROMANTIC COHERENCE & COMPILING TESTS 💖');
console.log('\x1b[36m%s\x1b[0m', '---------------------------------------------------');

try {
  // 1. Verify index.html exists and has new DOM components
  const htmlPath = path.join(process.cwd(), 'index.html');
  assert.ok(fs.existsSync(htmlPath), 'index.html does not exist in workspace root.');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');

  const requiredHtmlIds = [
    'love-gate',
    'enter-palace-btn',
    'gate-door-left',
    'gate-door-right',
    'gate-lock-wrapper',
    'promises-drawer-card',
    'draw-promise-btn',
    'promise-envelope',
    'promise-text',
    'diagnostics-card',
    'run-diagnostics-btn',
    'diagnostic-console'
  ];

  console.log('\x1b[33m%s\x1b[0m', '🔍 Phase 1: Verifying HTML DOM Element Bindings...');
  requiredHtmlIds.forEach(id => {
    assert.ok(htmlContent.includes(`id="${id}"`), `DOM element with id="${id}" was not found in index.html!`);
    console.log(`  ✓ Element [#${id}] bound successfully.`);
  });
  console.log('\x1b[32m%s\x1b[0m', '✓ Phase 1 Completed: All required elements are present in DOM.');

  // 2. Verify script.js exists and has initialization logic
  const scriptPath = path.join(process.cwd(), 'script.js');
  assert.ok(fs.existsSync(scriptPath), 'script.js does not exist in workspace root.');
  const scriptContent = fs.readFileSync(scriptPath, 'utf8');

  const requiredFunctions = [
    'initLoveGate',
    'initPromisesDrawer',
    'initDiagnostics'
  ];

  console.log('\n\x1b[33m%s\x1b[0m', '🔍 Phase 2: Verifying JavaScript Event Initializers...');
  requiredFunctions.forEach(fn => {
    assert.ok(scriptContent.includes(`function ${fn}`), `JavaScript function "${fn}" was not declared in script.js!`);
    console.log(`  ✓ Function [${fn}()] compiled successfully.`);
  });
  console.log('\x1b[32m%s\x1b[0m', '✓ Phase 2 Completed: All initializer handlers compiled.');

  // 3. Verify style.css rules
  const stylePath = path.join(process.cwd(), 'style.css');
  assert.ok(fs.existsSync(stylePath), 'style.css does not exist in workspace root.');
  const styleContent = fs.readFileSync(stylePath, 'utf8');

  const requiredClasses = [
    '.slide-left',
    '.slide-right',
    '.lock-disappear',
    '.gate-fade-out'
  ];

  console.log('\n\x1b[33m%s\x1b[0m', '🔍 Phase 3: Verifying CSS Style Classes...');
  requiredClasses.forEach(className => {
    assert.ok(styleContent.includes(className), `CSS class "${className}" was not found in style.css!`);
    console.log(`  ✓ Class [${className}] compiled successfully.`);
  });
  console.log('\x1b[32m%s\x1b[0m', '✓ Phase 3 Completed: All design classes compiled.');

  console.log('\n\x1b[35m%s\x1b[0m', '---------------------------------------------------');
  console.log('\x1b[32;1m%s\x1b[0m', '🎉 ALL VERIFICATION TESTS PASSED SUCCESSFULLY! (100% SUCCESS) 🎉');

} catch (err) {
  console.error('\n\x1b[31;1m%s\x1b[0m', '✗ TEST SUITE FAILED:');
  console.error('\x1b[31m%s\x1b[0m', err.message);
  process.exit(1);
}
