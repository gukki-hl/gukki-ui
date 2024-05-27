import { ref } from 'vue';

// 定义数据结构
interface RestaurantItem {
  value: string;
}

export default function useRestaurantSearch() {
  const restaurants = ref<RestaurantItem[]>([]);
  
  // 定义搜索函数的类型
  type QuerySearchFunction = (queryString: string, cb: (results: RestaurantItem[]) => void) => void;
  
  // 实现搜索函数
  const querySearch: QuerySearchFunction = (queryString, cb) => {
    const emailItem = ['qq.com', '163.com'];
    const results = queryString 
      ? emailItem.map(el => ({ value: `${queryString.split('@')[0]}@${el}` }))
      : restaurants.value;
    cb(results);
  };

  return { restaurants, querySearch };
}
