
#!/bin/sh
cd /Users/houwenli/Documents/workspace/工作空间/workspace_test/node/node_demo/blog1/logs/
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log