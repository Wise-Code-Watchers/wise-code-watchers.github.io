import React, { useState } from 'react';

const benchmarkData = {
  sentry: {
    name: 'Sentry',
    language: 'Python',
    description: '错误追踪与性能监控',
    bugs: [
      { desc: '高流量审计日志的分页性能增强', detail: '导入不存在的OptimizedCursorPaginator', severity: 'HIGH', wcw: false, greptile: true, copilot: false, coderabbit: false, cursor: false, graphite: false },
      { desc: '优化缓冲区插入，插入时进行驱逐', detail: '负偏移光标作绕过分页边界', severity: 'CRITICAL', wcw: true, greptile: false, copilot: false, coderabbit: true, cursor: true, graphite: false },
      { desc: '支持上采样错误计数并进行性能优化', detail: 'sample_rate = 0.0 是假且跳过', severity: 'LOW', wcw: false, greptile: true, copilot: false, coderabbit: false, cursor: false, graphite: false },
      { desc: 'GitHub OAuth 安全增强', detail: '如果缺少github_authenticated_user状态，则为空引用', severity: 'CRITICAL', wcw: true, greptile: false, copilot: true, coderabbit: false, cursor: true, graphite: false },
      { desc: '重放自助批量删除系统', detail: '错误响应格式的重大变更', severity: 'CRITICAL', wcw: false, greptile: true, copilot: false, coderabbit: false, cursor: false, graphite: false },
      { desc: '带健康监测的跨缓冲区多进程增强', detail: '"shard"和"shards"的度量标记不一致', severity: 'MEDIUM', wcw: false, greptile: true, copilot: true, coderabbit: false, cursor: false, graphite: false },
      { desc: '实现跨系统发行同步', detail: '数据类时间戳中的共享可变默认', severity: 'MEDIUM', wcw: false, greptile: true, copilot: true, coderabbit: true, cursor: true, graphite: false },
      { desc: '重组事件创建/问题发生逻辑', detail: '使用过时的配置变量而不是更新后的配置变量', severity: 'HIGH', wcw: false, greptile: true, copilot: false, coderabbit: true, cursor: false, graphite: false },
      { desc: '新增使用队列管理并行的能力', detail: '队列无效。ShutDown 异常处理', severity: 'HIGH', wcw: false, greptile: true, copilot: true, coderabbit: false, cursor: false, graphite: false },
      { desc: '添加钩子以产生有状态检测器中的出现', detail: '不完整实现（仅包含通行证）', severity: 'HIGH', wcw: true, greptile: true, copilot: false, coderabbit: false, cursor: true, graphite: false },
    ]
  },
  calcom: {
    name: 'Cal.com',
    language: 'TypeScript',
    description: '开源日程调度基础设施',
    bugs: [
      { desc: 'appStore 包的异步导入', detail: 'forEach 中的异步回调会产生未处理的承诺拒绝', severity: 'LOW', wcw: true, greptile: true, copilot: true, coderabbit: true, cursor: true, graphite: false },
      { desc: '特色：双重认证备份代码', detail: '备份码使用后未被取消', severity: 'CRITICAL', wcw: false, greptile: false, copilot: false, coderabbit: true, cursor: false, graphite: false },
      { desc: '修复：在 destinationCalendar 上处理集体多主机', detail: '如果数组为空，则为空引用错误', severity: 'MEDIUM', wcw: true, greptile: true, copilot: true, coderabbit: false, cursor: true, graphite: false },
      { desc: 'feat：将InsightsBookingService转换为使用Prisma.sql原始查询', detail: '原始SQL查询构建中的潜在SQL注入风险', severity: 'CRITICAL', wcw: true, greptile: true, copilot: true, coderabbit: false, cursor: false, graphite: false },
      { desc: '为预订生命周期事件提供全面的工作流程提醒管理', detail: '当 immediateDelete 为真时，缺少数据库清理', severity: 'HIGH', wcw: false, greptile: true, copilot: false, coderabbit: false, cursor: true, graphite: false },
      { desc: '高级日期覆盖处理和时区兼容性改进', detail: '错误地计算了用slotStartTime而不是slotEndTime的结束时间', severity: 'MEDIUM', wcw: true, greptile: true, copilot: true, coderabbit: true, cursor: false, graphite: false },
      { desc: 'OAuth 凭证同步与应用集成增强', detail: '使用直接字符串比较的时序攻击漏洞', severity: 'CRITICAL', wcw: true, greptile: true, copilot: false, coderabbit: false, cursor: false, graphite: false },
      { desc: '短信流程提醒、重试计数跟踪', detail: 'OR条件会导致所有工作流程提醒被删除', severity: 'HIGH', wcw: true, greptile: false, copilot: true, coderabbit: true, cursor: true, graphite: false },
      { desc: '为现有预订添加宾客管理功能', detail: '电子邮件黑名单中的大小写敏感性绕过', severity: 'HIGH', wcw: true, greptile: true, copilot: true, coderabbit: false, cursor: false, graphite: false },
      { desc: '专长：添加日历缓存状态和作', detail: '由于不可靠的更新At字段导致缓存状态追踪不准确', severity: 'LOW', wcw: true, greptile: true, copilot: false, coderabbit: true, cursor: false, graphite: false },
    ]
  },
  grafana: {
    name: 'Grafana',
    language: 'Go',
    description: '监控与可观测性平台',
    bugs: [
      { desc: '匿名：添加可配置的设备限制', detail: 'CreateOrUpdateDevice 方法中的竞态条件', severity: 'HIGH', wcw: true, greptile: true, copilot: false, coderabbit: false, cursor: false, graphite: false },
      { desc: 'AuthZService：改进 authz 缓存', detail: '缓存条目未过期导致永久许可被拒', severity: 'HIGH', wcw: true, greptile: false, copilot: false, coderabbit: true, cursor: false, graphite: false },
      { desc: '插件：任务：将仪表中间件重命名为指标中间件', detail: '未定义端点常数导致编译错误', severity: 'CRITICAL', wcw: false, greptile: true, copilot: false, coderabbit: false, cursor: false, graphite: false },
      { desc: '高级查询处理架构', detail: '双重插值风险', severity: 'CRITICAL', wcw: false, greptile: false, copilot: true, coderabbit: false, cursor: true, graphite: false },
      { desc: '通知规则处理引擎', detail: '缺少键道具导致React渲染问题', severity: 'MEDIUM', wcw: false, greptile: true, copilot: false, coderabbit: true, cursor: true, graphite: false },
      { desc: '双存储架构', detail: '错误的指标记录方法导致误导性的绩效跟踪', severity: 'MEDIUM', wcw: true, greptile: true, copilot: true, coderabbit: true, cursor: false, graphite: true },
      { desc: '数据库性能优化', detail: '错误级别日志错误', severity: 'LOW', wcw: true, greptile: true, copilot: true, coderabbit: true, cursor: false, graphite: true },
      { desc: '前端资产优化', detail: '并发注释删除作中的死锁潜能', severity: 'HIGH', wcw: false, greptile: true, copilot: true, coderabbit: true, cursor: true, graphite: false },
      { desc: '高级SQL分析框架', detail: 'enableSqlExpressions 函数总是返回 false，禁用 SQL 功能', severity: 'CRITICAL', wcw: true, greptile: true, copilot: true, coderabbit: true, cursor: true, graphite: true },
      { desc: '统一存储性能优化', detail: '缓存锁定中的竞态条件', severity: 'HIGH', wcw: true, greptile: true, copilot: false, coderabbit: false, cursor: true, graphite: false },
    ]
  },
  keycloak: {
    name: 'Keycloak',
    language: 'Java',
    description: '身份与访问管理',
    bugs: [
      { desc: '修复通过通行密钥重新认证的问题', detail: 'ConditionalPasskeysEnabled（） 调用时没有 UserModel 参数', severity: 'MEDIUM', wcw: false, greptile: false, copilot: false, coderabbit: false, cursor: false, graphite: false, greptileMiss: true },
      { desc: '为 IdentityProviderStorageProvider .getForLogin作添加缓存支持', detail: '递归缓存调用使用会话代替代理', severity: 'CRITICAL', wcw: false, greptile: true, copilot: false, coderabbit: false, cursor: false, graphite: false },
      { desc: '添加 AuthzClientCryptoProvider 以进行授权客户端密码作', detail: '返回错误的提供商（默认密钥存储，而不是 BouncyCastle）', severity: 'HIGH', wcw: true, greptile: true, copilot: false, coderabbit: true, cursor: false, graphite: false },
      { desc: '添加滚动更新功能标志和兼容性框架', detail: '错误的出口代码方法调用', severity: 'MEDIUM', wcw: true, greptile: false, copilot: false, coderabbit: false, cursor: false, graphite: false },
      { desc: '向授权模式添加客户端资源类型和作用域', detail: '功能标志不一致导致权限被遗弃的错误', severity: 'HIGH', wcw: true, greptile: false, copilot: false, coderabbit: false, cursor: true, graphite: false },
      { desc: '向授权模式添加组资源类型和作用域', detail: 'canManage（） 方法中的权限检查错误', severity: 'HIGH', wcw: true, greptile: true, copilot: true, coderabbit: true, cursor: true, graphite: false },
      { desc: '为翻译消息资源添加HTML消毒剂', detail: '立陶宛语翻译文件包含意大利语文本', severity: 'LOW', wcw: true, greptile: true, copilot: true, coderabbit: true, cursor: true, graphite: false },
      { desc: '实现访问令牌上下文编码框架', detail: 'null 检查中参数错误（grantType vs. rawTokenId）', severity: 'CRITICAL', wcw: true, greptile: true, copilot: true, coderabbit: true, cursor: true, graphite: false },
      { desc: '为用户存储提供商实现恢复密钥支持', detail: '不安全的原始列表反序列化，但没有类型安全', severity: 'MEDIUM', wcw: true, greptile: true, copilot: false, coderabbit: false, cursor: true, graphite: false },
      { desc: '修复并发组访问以防止NullPointerException', detail: '缺少空检查导致NullPointerException', severity: 'CRITICAL', wcw: true, greptile: true, copilot: true, coderabbit: false, cursor: true, graphite: false },
    ]
  },
  discourse: {
    name: 'Discourse',
    language: 'Ruby',
    description: '社区讨论平台',
    bugs: [
      { desc: '功能：自动压缩大图', detail: '方法覆盖导致参数不匹配', severity: 'MEDIUM', wcw: true, greptile: true, copilot: true, coderabbit: true, cursor: true, graphite: false },
      { desc: '功能：邮件中按主题取消订阅选项', detail: '无引用，不存在 TopicUser', severity: 'HIGH', wcw: true, greptile: true, copilot: true, coderabbit: true, cursor: true, graphite: false },
      { desc: '为被封锁用户添加全面的邮件验证', detail: 'BlockedEmail.should_block？读取时修改数据库', severity: 'CRITICAL', wcw: true, greptile: true, copilot: false, coderabbit: false, cursor: true, graphite: false },
      { desc: '增强嵌入URL处理和验证系统', detail: '使用未验证的open（url）SSRF漏洞', severity: 'CRITICAL', wcw: true, greptile: true, copilot: true, coderabbit: true, cursor: true, graphite: false },
      { desc: '利用Flexbox混音优化头部布局性能', detail: '混合浮点：左边用Flexbox会导致布局问题', severity: 'LOW', wcw: false, greptile: false, copilot: false, coderabbit: true, cursor: false, graphite: false, greptileMiss: true },
      { desc: '用户体验：如果网站域名与实例域名相同，则显示完整的 URL 路径', detail: '带有<<算符的弦变音', severity: 'MEDIUM', wcw: false, greptile: false, copilot: true, coderabbit: false, cursor: true, graphite: false, greptileMiss: true },
      { desc: '比例色彩$lightness必须使用$secondary来处理暗色主题', detail: '主题颜色的不一致会影响可见度', severity: 'LOW', wcw: false, greptile: false, copilot: true, coderabbit: true, cursor: true, graphite: false, greptileMiss: true },
      { desc: '修正：正确处理组员身份', detail: '异步成员加载中的竞态条件', severity: 'HIGH', wcw: true, greptile: true, copilot: false, coderabbit: false, cursor: false, graphite: false },
      { desc: '功能：本地化备份（服务器端）', detail: '懒惰的线程安全问题@loaded_locales', severity: 'HIGH', wcw: true, greptile: true, copilot: true, coderabbit: false, cursor: false, graphite: false },
      { desc: '功能：可以编辑类别/宿主关系以进行嵌入', detail: 'NoMethodError before_validation in EmbeddableHost', severity: 'CRITICAL', wcw: true, greptile: true, copilot: true, coderabbit: false, cursor: true, graphite: false },
    ]
  }
};

const tools = ['wcw', 'greptile', 'copilot', 'coderabbit', 'cursor', 'graphite'];
const toolNames = {
  wcw: 'wcw',
  greptile: 'Greptile',
  copilot: 'Copilot',
  coderabbit: 'CodeRabbit',
  cursor: 'Cursor',
  graphite: 'Graphite'
};

const toolColors = {
  wcw: '#FF6B35',
  greptile: '#10B981',
  copilot: '#6366F1',
  coderabbit: '#F59E0B',
  cursor: '#8B5CF6',
  graphite: '#6B7280'
};

const severityColors = {
  CRITICAL: { bg: 'rgba(239, 68, 68, 0.15)', text: '#EF4444', border: '#EF4444' },
  HIGH: { bg: 'rgba(249, 115, 22, 0.15)', text: '#F97316', border: '#F97316' },
  MEDIUM: { bg: 'rgba(234, 179, 8, 0.15)', text: '#EAB308', border: '#EAB308' },
  LOW: { bg: 'rgba(34, 197, 94, 0.15)', text: '#22C55E', border: '#22C55E' }
};

const languageIcons = {
  Python: '🐍',
  TypeScript: '📘',
  Go: '🔷',
  Java: '☕',
  Ruby: '💎'
};

function calculateStats() {
  const stats = {};
  tools.forEach(tool => {
    stats[tool] = { total: 0, caught: 0, bySeverity: { CRITICAL: { total: 0, caught: 0 }, HIGH: { total: 0, caught: 0 }, MEDIUM: { total: 0, caught: 0 }, LOW: { total: 0, caught: 0 } } };
  });

  Object.values(benchmarkData).forEach(project => {
    project.bugs.forEach(bug => {
      tools.forEach(tool => {
        stats[tool].total++;
        stats[tool].bySeverity[bug.severity].total++;
        if (bug[tool]) {
          stats[tool].caught++;
          stats[tool].bySeverity[bug.severity].caught++;
        }
      });
    });
  });

  return stats;
}

function calculateProjectStats(projectKey) {
  const project = benchmarkData[projectKey];
  const stats = {};
  tools.forEach(tool => {
    stats[tool] = { caught: 0, total: project.bugs.length };
    project.bugs.forEach(bug => {
      if (bug[tool]) stats[tool].caught++;
    });
  });
  return stats;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('sentry');
  const stats = calculateStats();

  const sortedTools = [...tools].sort((a, b) => {
    const rateA = stats[a].caught / stats[a].total;
    const rateB = stats[b].caught / stats[b].total;
    return rateB - rateA;
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #0d0d14 100%)',
      color: '#E5E7EB',
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Global Styles */}
      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          50% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
      {/* Background effects */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255, 107, 53, 0.15), transparent)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'fixed',
        top: '50%',
        right: '-20%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08), transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Header */}
      <header style={{
        padding: '24px 48px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        backdropFilter: 'blur(20px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(10, 10, 15, 0.8)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #FF6B35, #FF8C5A)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '18px',
              color: '#fff',
              boxShadow: '0 4px 20px rgba(255, 107, 53, 0.3)'
            }}>W</div>
            <span style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '-0.02em' }}>wcw</span>
          </div>
          <nav style={{ display: 'flex', gap: '32px', fontSize: '14px', color: '#9CA3AF' }}>
            <a href="#" style={{ color: '#E5E7EB', textDecoration: 'none' }}>评测</a>
            <a href="#" style={{ color: '#9CA3AF', textDecoration: 'none' }}>文档</a>
            <a href="#" style={{ color: '#9CA3AF', textDecoration: 'none' }}>定价</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        padding: '80px 48px 60px',
        textAlign: 'center',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'inline-block',
          padding: '6px 16px',
          background: 'rgba(255, 107, 53, 0.1)',
          border: '1px solid rgba(255, 107, 53, 0.3)',
          borderRadius: '20px',
          fontSize: '13px',
          color: '#FF8C5A',
          marginBottom: '24px',
          fontWeight: 500
        }}>
          AI 代码审查评测 2025
        </div>
        <h1 style={{
          fontSize: '52px',
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: '24px',
          letterSpacing: '-0.03em',
          background: 'linear-gradient(135deg, #fff 0%, #9CA3AF 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          AI 代码审查工具<br />性能对比评测
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#9CA3AF',
          maxWidth: '640px',
          margin: '0 auto 48px',
          lineHeight: 1.7
        }}>
          基于 5 个开源项目的 50 个真实 Bug，评估 6 款 AI 代码审查工具的实际表现。
          所有测试用例均来自公开可验证的代码仓库。
        </p>

        {/* Hero Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          maxWidth: '720px',
          margin: '0 auto'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{ fontSize: '42px', fontWeight: 700, color: '#FF6B35', marginBottom: '8px' }}>50</div>
            <div style={{ fontSize: '14px', color: '#9CA3AF' }}>真实 Bug 测试用例</div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{ fontSize: '42px', fontWeight: 700, color: '#FF6B35', marginBottom: '8px' }}>5</div>
            <div style={{ fontSize: '14px', color: '#9CA3AF' }}>开源代码仓库</div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{ fontSize: '42px', fontWeight: 700, color: '#FF6B35', marginBottom: '8px' }}>6</div>
            <div style={{ fontSize: '14px', color: '#9CA3AF' }}>AI 审查工具</div>
          </div>
        </div>
      </section>

      {/* Greptile 漏报警示 */}
      <section style={{
        padding: '40px 48px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '16px',
          padding: '28px 32px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '4px',
            height: '100%',
            background: '#EF4444'
          }} />
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'rgba(239, 68, 68, 0.2)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              flexShrink: 0
            }}>⚠️</div>
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#EF4444',
                marginBottom: '8px'
              }}>
                Greptile Benchmark 数据存疑
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#D1D5DB',
                lineHeight: 1.6,
                marginBottom: '16px'
              }}>
                经过我们独立复现验证，发现 Greptile 官方 Benchmark 中存在 <strong style={{ color: '#EF4444' }}>4 处漏报</strong>，
                以下 Bug 在 Greptile 的评测中被标记为"已检测"，但实际上 <strong style={{ color: '#EF4444' }}>并未被检测出来</strong>：
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px'
              }}>
                {[
                  { project: 'Keycloak', bug: '修复通过通行密钥重新认证的问题', severity: 'MEDIUM' },
                  { project: 'Discourse', bug: '利用Flexbox混音优化头部布局性能', severity: 'LOW' },
                  { project: 'Discourse', bug: '网站域名与实例域名相同时显示完整URL路径', severity: 'MEDIUM' },
                  { project: 'Discourse', bug: '比例色彩$lightness处理暗色主题', severity: 'LOW' }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    background: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '8px',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '22px',
                      height: '22px',
                      background: 'rgba(239, 68, 68, 0.3)',
                      border: '1.5px solid #EF4444',
                      borderRadius: '4px',
                      color: '#EF4444',
                      fontWeight: 700,
                      fontSize: '12px'
                    }}>✗</span>
                    <div>
                      <div style={{ fontSize: '13px', color: '#E5E7EB', fontWeight: 500 }}>{item.bug}</div>
                      <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '2px' }}>
                        {item.project} · <span style={{
                          color: severityColors[item.severity].text
                        }}>{item.severity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{
                fontSize: '13px',
                color: '#9CA3AF',
                marginTop: '16px',
                fontStyle: 'italic'
              }}>
                💡 在下方详细结果表格中，这些漏报已用红色边框标注
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Overall Performance */}
      <section style={{
        padding: '60px 48px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: 600,
          marginBottom: '12px',
          letterSpacing: '-0.02em'
        }}>总体检测率</h2>
        <p style={{ color: '#9CA3AF', marginBottom: '40px', fontSize: '15px' }}>
          各工具在 50 个真实 Bug 中的总体检测表现
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {sortedTools.map((tool, idx) => {
            const rate = Math.round((stats[tool].caught / stats[tool].total) * 100);
            const isWcw = tool === 'wcw';
            return (
              <div key={tool} style={{
                display: 'grid',
                gridTemplateColumns: '140px 1fr 80px',
                alignItems: 'center',
                gap: '20px',
                padding: '16px 20px',
                background: isWcw ? 'rgba(255, 107, 53, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${isWcw ? 'rgba(255, 107, 53, 0.3)' : 'rgba(255, 255, 255, 0.06)'}`,
                borderRadius: '12px',
                transition: 'all 0.2s ease'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {idx === 0 && <span style={{ fontSize: '16px' }}>🥇</span>}
                  {idx === 1 && <span style={{ fontSize: '16px' }}>🥈</span>}
                  {idx === 2 && <span style={{ fontSize: '16px' }}>🥉</span>}
                  <span style={{
                    fontWeight: isWcw ? 600 : 500,
                    color: isWcw ? '#FF8C5A' : '#E5E7EB'
                  }}>{toolNames[tool]}</span>
                </div>
                <div style={{
                  height: '28px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${rate}%`,
                    background: isWcw 
                      ? 'linear-gradient(90deg, #FF6B35, #FF8C5A)'
                      : `linear-gradient(90deg, ${toolColors[tool]}88, ${toolColors[tool]})`,
                    borderRadius: '6px',
                    transition: 'width 0.8s ease-out',
                    boxShadow: isWcw ? '0 0 20px rgba(255, 107, 53, 0.3)' : 'none'
                  }} />
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: isWcw ? '#FF6B35' : '#E5E7EB',
                  textAlign: 'right'
                }}>
                  {rate}%
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Severity Breakdown */}
      <section style={{
        padding: '60px 48px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: 600,
          marginBottom: '12px',
          letterSpacing: '-0.02em'
        }}>按严重程度分析</h2>
        <p style={{ color: '#9CA3AF', marginBottom: '40px', fontSize: '15px' }}>
          不同严重程度 Bug 的检测率对比
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px'
        }}>
          {['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(severity => (
            <div key={severity} style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '16px',
              padding: '24px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: severityColors[severity].border
              }} />
              <div style={{
                display: 'inline-block',
                padding: '4px 10px',
                background: severityColors[severity].bg,
                color: severityColors[severity].text,
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                marginBottom: '20px'
              }}>{severity}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {sortedTools.slice(0, 4).map(tool => {
                  const s = stats[tool].bySeverity[severity];
                  const rate = s.total > 0 ? Math.round((s.caught / s.total) * 100) : 0;
                  const isWcw = tool === 'wcw';
                  return (
                    <div key={tool} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{
                        fontSize: '13px',
                        color: isWcw ? '#FF8C5A' : '#9CA3AF',
                        fontWeight: isWcw ? 600 : 400
                      }}>{toolNames[tool]}</span>
                      <span style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        color: isWcw ? '#FF6B35' : '#E5E7EB'
                      }}>{rate}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Test Dataset */}
      <section style={{
        padding: '60px 48px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: 600,
          marginBottom: '12px',
          letterSpacing: '-0.02em'
        }}>测试数据集</h2>
        <p style={{ color: '#9CA3AF', marginBottom: '40px', fontSize: '15px' }}>
          5 个不同语言的开源代码仓库，每个仓库 10 个真实 Bug
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '16px'
        }}>
          {Object.entries(benchmarkData).map(([key, project]) => (
            <div key={key} style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '14px',
              padding: '20px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              ...(activeTab === key ? {
                background: 'rgba(255, 107, 53, 0.08)',
                borderColor: 'rgba(255, 107, 53, 0.3)'
              } : {})
            }} onClick={() => setActiveTab(key)}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{languageIcons[project.language]}</div>
              <div style={{ fontWeight: 600, marginBottom: '4px' }}>{project.name}</div>
              <div style={{ fontSize: '12px', color: '#9CA3AF' }}>{project.language}</div>
              <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '8px' }}>{project.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Case Library */}
      <section style={{
        padding: '60px 48px 100px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: 600,
          marginBottom: '12px',
          letterSpacing: '-0.02em'
        }}>详细测试结果</h2>
        <p style={{ color: '#9CA3AF', marginBottom: '24px', fontSize: '15px' }}>
          点击上方项目卡片切换查看不同仓库的测试用例
        </p>

        {/* Legend */}
        <div style={{
          display: 'flex',
          gap: '24px',
          marginBottom: '20px',
          fontSize: '13px',
          color: '#9CA3AF'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#22C55E', fontSize: '16px' }}>✓</span>
            <span>已检测</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#4B5563', fontSize: '16px' }}>✗</span>
            <span>未检测</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '20px',
              height: '20px',
              background: 'rgba(239, 68, 68, 0.2)',
              border: '2px solid #EF4444',
              borderRadius: '4px',
              color: '#EF4444',
              fontWeight: 700,
              fontSize: '11px'
            }}>✗</span>
            <span style={{ color: '#EF4444' }}>Greptile 漏报（官方标记为已检测，实际未检测）</span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '16px'
        }}>
          {Object.entries(benchmarkData).map(([key, project]) => (
            <button key={key} onClick={() => setActiveTab(key)} style={{
              padding: '8px 16px',
              background: activeTab === key ? 'rgba(255, 107, 53, 0.15)' : 'transparent',
              border: `1px solid ${activeTab === key ? 'rgba(255, 107, 53, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
              borderRadius: '8px',
              color: activeTab === key ? '#FF8C5A' : '#9CA3AF',
              fontSize: '14px',
              cursor: 'pointer',
              fontWeight: activeTab === key ? 600 : 400,
              transition: 'all 0.2s ease'
            }}>
              {project.name}
            </button>
          ))}
        </div>

        {/* Results Table */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '16px',
          overflow: 'hidden'
        }}>
          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 100px repeat(6, 80px)',
            padding: '16px 20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            background: 'rgba(255, 255, 255, 0.02)',
            fontSize: '13px',
            fontWeight: 600,
            color: '#9CA3AF'
          }}>
            <div>Bug 描述</div>
            <div style={{ textAlign: 'center' }}>严重程度</div>
            {tools.map(tool => (
              <div key={tool} style={{
                textAlign: 'center',
                color: tool === 'wcw' ? '#FF8C5A' : '#9CA3AF'
              }}>{toolNames[tool]}</div>
            ))}
          </div>

          {/* Table Body */}
          {benchmarkData[activeTab].bugs.map((bug, idx) => (
            <div key={idx} style={{
              display: 'grid',
              gridTemplateColumns: '2fr 100px repeat(6, 80px)',
              padding: '14px 20px',
              borderBottom: idx < benchmarkData[activeTab].bugs.length - 1 ? '1px solid rgba(255, 255, 255, 0.04)' : 'none',
              alignItems: 'center',
              fontSize: '14px',
              transition: 'background 0.15s ease',
              background: bug.greptileMiss ? 'rgba(239, 68, 68, 0.05)' : 'transparent',
              borderLeft: bug.greptileMiss ? '3px solid #EF4444' : '3px solid transparent'
            }}>
              <div>
                <div style={{ fontWeight: 500, marginBottom: '4px', color: '#E5E7EB' }}>{bug.desc}</div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>{bug.detail}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '3px 8px',
                  background: severityColors[bug.severity].bg,
                  color: severityColors[bug.severity].text,
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 600
                }}>{bug.severity}</span>
              </div>
              {tools.map(tool => (
                <div key={tool} style={{
                  textAlign: 'center',
                  fontSize: '18px',
                  position: 'relative'
                }}>
                  {bug[tool] ? (
                    <span style={{
                      color: tool === 'wcw' ? '#FF6B35' : '#22C55E',
                      textShadow: tool === 'wcw' ? '0 0 10px rgba(255, 107, 53, 0.5)' : 'none'
                    }}>✓</span>
                  ) : (
                    tool === 'greptile' && bug.greptileMiss ? (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '28px',
                        height: '28px',
                        background: 'rgba(239, 68, 68, 0.2)',
                        border: '2px solid #EF4444',
                        borderRadius: '6px',
                        color: '#EF4444',
                        fontWeight: 700,
                        fontSize: '14px',
                        animation: 'pulse 2s infinite'
                      }} title="Greptile 漏报">✗</span>
                    ) : (
                      <span style={{ color: '#4B5563' }}>✗</span>
                    )
                  )}
                </div>
              ))}
            </div>
          ))}

          {/* Table Footer - Totals */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 100px repeat(6, 80px)',
            padding: '16px 20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(255, 255, 255, 0.03)',
            fontWeight: 600
          }}>
            <div>检测总数</div>
            <div></div>
            {tools.map(tool => {
              const projectStats = calculateProjectStats(activeTab);
              return (
                <div key={tool} style={{
                  textAlign: 'center',
                  color: tool === 'wcw' ? '#FF6B35' : '#E5E7EB'
                }}>
                  {projectStats[tool].caught}/{projectStats[tool].total}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px 48px',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        textAlign: 'center'
      }}>
        <p style={{ color: '#6B7280', fontSize: '14px' }}>
          © 2025 wcw AI 代码审查评测
        </p>
      </footer>
    </div>
  );
}
