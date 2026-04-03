<template>
  <div class="main-layout-childList">
    <div class="choice-box">
      <div
        v-for="(item, index) in microApps"
        :key="index"
        class="card-wrapper"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <div class="cb-item" @click="handleClick($event, item)">
          <div class="card-inner">
            <!-- 前面 -->
            <div class="card-front">
              <div class="card-glow"></div>
              <div class="card-content">
                <div class="icon-wrapper">
                  <img :src="require(`@/assets/images/${item.icon}`)" alt="" />
                  <div class="icon-shine"></div>
                </div>
                <span class="cbi-title">{{ item.displayName || item.name }}</span>
                <div class="card-footer">
                  <span class="launch-text">点击启动</span>
                  <div class="arrow">→</div>
                </div>
              </div>
            </div>
            <!-- 背面 -->
            <div class="card-back">
              <div class="card-content">
                <div class="back-icon">🚀</div>
                <h3>{{ item.displayName || item.name }}</h3>
                <p class="description">微前端子应用</p>

                <div class="tech-stack-section">
                  <div class="section-title">
                    <i class="tech-icon">⚙️</i>
                    <span>技术栈</span>
                  </div>
                  <div class="tech-stack-list">
                    <div
                      v-for="(tech, techIndex) in item.techStack"
                      :key="techIndex"
                      class="tech-item"
                    >
                      <span class="tech-name">{{ tech.name }}</span>
                      <span v-if="tech.version" class="tech-version">{{ tech.version }}</span>
                    </div>
                  </div>
                </div>

                <div class="tech-tags">
                  <span class="tag">Qiankun</span>
                  <span class="tag">{{ getFramework(item.name) }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 点击波纹效果 -->
          <span class="ripple"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, toRefs, onBeforeMount, onMounted, ref, watch } from 'vue';
import microApps from '../../../micro-app';
import { registerMicroApps, start, setDefaultMountApp } from 'qiankun';
import { useRouteInfoStore } from '../../store/index';
import { useRouter } from 'vue-router';

const router = useRouter();
const routeInfo = useRouteInfoStore();
const watchedValue1 = ref(routeInfo.currentSub);
const watchedValue2 = ref(routeInfo.currentPath);

// 使用 watch 监听多个属性的变化
watch(
  [() => routeInfo.currentSub, () => routeInfo.currentPath],
  ([newValue1, newValue2], [oldValue1, oldValue2]) => {
    if (newValue1 == 'child-vite-react') {
      goto(microApps[1]);
    }
  }
);

onMounted(() => {
  const config = ref({
    beforeLoad: [
      app => {
        console.log(
          '%c before load',
          'background:#0f0 ; padding: 1px; border-radius: 3px;  color: #fff',
          app
        );
      },
    ],
    beforeMount: [
      app => {
        console.log(
          '%c before mount',
          'background:#f1f ; padding: 1px; border-radius: 3px;  color: #fff',
          app
        );
      },
    ],
    afterMount: [
      app => {
        console.log(
          '%c after mount',
          'background:#a7a ; padding: 1px; border-radius: 3px;  color: #fff',
          app
        );
      },
    ],
    beforeUnmount: [
      app => {
        console.log(
          '%c after unmount',
          'background:#a7a ; padding: 1px; border-radius: 3px;  color: #fff',
          app
        );
      },
    ],
    afterUnmount: [
      app => {
        console.log(
          '%c after unmount',
          'background:#a7a ; padding: 1px; border-radius: 3px;  color: #fff',
          app
        );
      },
    ],
  });
  registerMicroApps(microApps, config.value);
  start();
});

function goto(item: { activeRule: string }) {
  router.push(item.activeRule);
}

// 点击处理，添加波纹效果
function handleClick(event: MouseEvent, item: any) {
  const card = event.currentTarget as HTMLElement;
  const ripple = card.querySelector('.ripple') as HTMLElement;

  // 创建波纹效果
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.classList.add('active');

  setTimeout(() => {
    ripple.classList.remove('active');
  }, 600);

  // 延迟跳转，让动画完成
  setTimeout(() => {
    goto(item);
  }, 300);
}

// 根据名称获取框架类型
function getFramework(name: string) {
  if (name.toLowerCase().includes('vue')) return 'Vue';
  if (name.toLowerCase().includes('react')) return 'React';
  if (name.toLowerCase().includes('html')) return 'HTML';
  return 'Web';
}
</script>
<style lang="less" scoped>
.main-layout-childList {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;

  // 背景动画粒子效果
  &::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: backgroundMove 20s linear infinite;
  }

  .choice-box {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 60px;
    padding: 40px;
    position: relative;
    z-index: 1;
    flex-wrap: wrap;

    .card-wrapper {
      perspective: 1000px;
      animation: fadeInUp 0.6s ease-out forwards;
      opacity: 0;
      width: 320px;
      height: 400px;
    }

    .cb-item {
      position: relative;
      width: 100%;
      height: 100%;
      cursor: pointer;
      transition: transform 0.3s ease;
      transform-style: preserve-3d;

      &:active {
        transform: scale(0.95);
      }

      .card-inner {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: transform 0.8s cubic-bezier(0.4, 0.2, 0.2, 1);
        transform-style: preserve-3d;
      }

      &:hover .card-inner {
        transform: rotateY(180deg);
      }

      .card-front,
      .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        border-radius: 24px;
        overflow: hidden;
      }

      .card-front {
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.95) 0%,
          rgba(255, 255, 255, 0.85) 100%
        );
        box-shadow:
          0 20px 60px rgba(0, 0, 0, 0.3),
          0 0 0 1px rgba(255, 255, 255, 0.5) inset;

        .card-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }

        .card-content {
          position: relative;
          z-index: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;

          .icon-wrapper {
            position: relative;
            width: 180px;
            height: 180px;
            margin-bottom: 30px;
            transition: transform 0.3s ease;

            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
              filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));
              transition: filter 0.3s ease;
            }

            .icon-shine {
              position: absolute;
              top: -10%;
              left: -10%;
              width: 120%;
              height: 120%;
              background: linear-gradient(
                45deg,
                transparent 30%,
                rgba(255, 255, 255, 0.6) 50%,
                transparent 70%
              );
              opacity: 0;
              animation: shine 3s ease-in-out infinite;
              pointer-events: none;
            }
          }

          .cbi-title {
            font-size: 32px;
            font-weight: 700;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 20px;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            white-space: nowrap;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .card-footer {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #667eea;
            font-size: 16px;
            font-weight: 500;
            opacity: 0.8;
            transition: all 0.3s ease;

            .arrow {
              font-size: 20px;
              transition: transform 0.3s ease;
            }
          }
        }
      }

      .card-back {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        transform: rotateY(180deg);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        top: 0;
        left: 0;

        .card-content {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px;
          color: white;

          .back-icon {
            font-size: 60px;
            margin-bottom: 15px;
            animation: float 3s ease-in-out infinite;
          }

          h3 {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 8px;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            white-space: nowrap;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .description {
            font-size: 14px;
            opacity: 0.9;
            margin-bottom: 20px;
          }

          .tech-stack-section {
            width: 100%;
            margin-bottom: 20px;

            .section-title {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              font-size: 14px;
              font-weight: 600;
              margin-bottom: 12px;
              opacity: 0.95;

              .tech-icon {
                font-size: 16px;
              }
            }

            .tech-stack-list {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 8px;
              width: 100%;

              .tech-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 8px 12px;
                background: rgba(255, 255, 255, 0.15);
                border-radius: 8px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                transition: all 0.3s ease;

                &:hover {
                  background: rgba(255, 255, 255, 0.25);
                  transform: translateY(-2px);
                }

                .tech-name {
                  font-size: 13px;
                  font-weight: 600;
                  margin-bottom: 2px;
                }

                .tech-version {
                  font-size: 11px;
                  opacity: 0.8;
                  color: rgba(255, 255, 255, 0.9);
                }
              }
            }
          }

          .tech-tags {
            display: flex;
            gap: 10px;

            .tag {
              padding: 6px 14px;
              background: rgba(255, 255, 255, 0.2);
              border-radius: 20px;
              font-size: 12px;
              font-weight: 500;
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.3);
            }
          }
        }
      }

      // 波纹效果
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        width: 20px;
        height: 20px;
        transform: translate(-50%, -50%) scale(0);
        pointer-events: none;
        z-index: 10;

        &.active {
          animation: rippleEffect 0.6s ease-out;
        }
      }
    }
  }
}

// 动画定义
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes backgroundMove {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes shine {
  0%,
  100% {
    opacity: 0;
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  50% {
    opacity: 1;
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes rippleEffect {
  to {
    transform: translate(-50%, -50%) scale(20);
    opacity: 0;
  }
}

// 响应式设计
@media (max-width: 1200px) {
  .main-layout-childList .choice-box {
    gap: 40px;

    .card-wrapper {
      width: 280px;
      height: 360px;
    }
  }
}

@media (max-width: 768px) {
  .main-layout-childList .choice-box {
    flex-direction: column;
    gap: 30px;

    .card-wrapper {
      width: 260px;
      height: 340px;
    }
  }
}
</style>
