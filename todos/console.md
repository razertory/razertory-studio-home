# 实现 cli 交互
实现一一个 cli 风格的交互界面，用户可以输入命令并在当前页面获得反馈。这些内容都在一个页面用纯前端实现。类似我们在 terminal 里输入命令获得反馈的体验。

# 预设内容
Tips for getting started：
1,2,3,4,5 五个选项：
当用户用 /about, /product, /contact, /message, /back 五个命令时，分别返回对应的预设内容：

1. /about - Learn more about RAZERTORY STUDIO.
> 我们是一个专注效率工具开发的团队，致力于为用户提供最佳的使用体验。


2. /product - Explore our products.
> ChatFrame.co - ChatFrame is a cross-platform desktop chatbot that unifies access to multiple LLM providersa and connect them with MCP (Model Context Protocol) servers. https://ChatFrame.co


3. /contact - Get in touch with us.
> Mail to studio@razertory.com

其中 1，2，3 选项会返回预设的信息，

4. /message - Leave us a message.

->  选项会提示用户输入留言内容并确认提交。最后返回感谢信息。


5. /back - Return to the main menu.