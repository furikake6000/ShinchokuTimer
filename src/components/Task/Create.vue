<template>
  <div id="taskCreate">
    <h1>やること登録</h1>

    <form method="post">
      <div class="text-align-left">
        <p>私は、帰ったら</p>
        <input type="text" name="name">
        <p>に</p>
        <select name="length">
          <option value="5">5分</option>
          <option value="10">10分</option>
          <option value="15">15分</option>
          <option value="30">30分</option>
          <option value="60">1時間</option>
          <option value="120">2時間</option>
          <option value="180">3時間</option>
        </select>
        <p>取り組みます。</p>
      </div>

      <a class="blockbtn btn-primary">
        <p class="text-large">今すぐやる</p>
        <p class="text-desc">ここをタップしてタイマーを起動</p>
      </a>

      <a class="blockbtn btn-primary">
        <p class="text-large">帰ったらやる</p>
        <p class="text-desc">ここをタップして予定を登録</p>
      </a>
    </form>
  </div>
</template>

<script>

export default {
  name: 'TaskCreate'
};
</script>

<style scoped lang='sass'>
h1
  display: block
  color: #4CC729
  background-color: #C2EFB5
  margin: 0
  padding: 2.5rem 0 1rem 0
</style>
